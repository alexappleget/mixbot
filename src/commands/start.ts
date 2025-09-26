import { Message } from "discord.js";
import { capitalizeWords } from "../util";
import { prisma } from "../config";
import { eventDrinks, eventIngredients } from "../maps";

export const startCommand = async (message: Message) => {
  const channelId = message.channel.id;

  try {
    const drinks = eventDrinks.get(channelId) || [];
    const ingredients = eventIngredients.get(channelId) || [];

    const availableIngredients = ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    const signatureDrinks = await prisma.signatureDrink.findMany({
      where: {
        name: {
          in: drinks,
        },
      },
    });

    const allCommonCocktails = await prisma.commonCocktail.findMany();

    const possibleCommonCocktails = allCommonCocktails.filter((cocktail) => {
      const cocktailIngredients = cocktail.ingredients.map((ingredient) =>
        ingredient.toLowerCase()
      );
      return cocktailIngredients.every((ingredient) =>
        availableIngredients.some(
          (available) =>
            available.includes(ingredient) || ingredient.includes(available)
        )
      );
    });

    let response = "";

    if (signatureDrinks.length > 0) {
      response += `**Found ${signatureDrinks.length} signature drink(s):**\n\n`;

      signatureDrinks.forEach((drink, index) => {
        response += `**${index + 1}. ${drink.name}**\n`;
        response += `**Ingredients:** ${capitalizeWords(
          drink.ingredients.join(", ")
        )}\n\n`;
        response += `**Instructions:**\n`;

        const instructions = drink.instructions as {
          step: number;
          action: string;
        }[];

        instructions.forEach((instruction) => {
          response += `Step ${instruction.step}: ${instruction.action}\n`;
        });

        response += "\n";
      });
    }

    if (possibleCommonCocktails.length > 0) {
      response += `**🍸 Possible Common Cocktails (${possibleCommonCocktails.length}):**\n\n`;

      possibleCommonCocktails.forEach((cocktail, index) => {
        response += `**${index + 1}. ${cocktail.name}**\n`;
        response += `**Ingredients:** ${capitalizeWords(
          cocktail.ingredients.join(", ")
        )}\n\n`;
        response += `**Instructions:**\n`;

        const instructions = cocktail.instructions as {
          step: number;
          action: string;
        }[];

        instructions.forEach((instruction) => {
          response += `Step ${instruction.step}: ${instruction.action}\n`;
        });

        response += "\n";
      });
    } else if (ingredients.length > 0) {
      response += `**🍸 No common cocktails can be made with available ingredients.**\n\n`;
    }

    if (response === "") {
      await message.reply(
        "❌ No drinks to display. Add signature drinks with `!drinks` and ingredients with `!ingredients` first."
      );
      return;
    }

    await message.reply(response);

    if (drinks.length > 0) {
      const foundDrinkNames = signatureDrinks.map((drink) => drink.name);
      const notFound = drinks.filter(
        (drink) => !foundDrinkNames.includes(drink)
      );

      if (notFound.length > 0) {
        await message.reply(
          `⚠️ **Signature drinks not found in database:** ${notFound.join(
            ", "
          )}`
        );
      }
    }
  } catch (error) {
    console.error("Error handling !start command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
