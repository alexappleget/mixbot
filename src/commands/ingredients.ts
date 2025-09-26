import { Message } from "discord.js";
import { capitalizeWords } from "../util";
import { eventIngredients } from "../maps";

export const ingredientsCommand = async (message: Message) => {
  const channelId = message.channel.id;
  const ingredientsText = message.content.slice(12).trim();

  try {
    if (ingredientsText) {
      const currentIngredients = eventIngredients.get(channelId) || [];

      const newIngredients = ingredientsText
        .split(",")
        .map((ingredient) => capitalizeWords(ingredient.trim()));

      const allIngredients = [
        ...new Set([...currentIngredients, ...newIngredients]),
      ];
      eventIngredients.set(channelId, allIngredients);

      const ingredientList = allIngredients
        .map((ingredient, index) => `${index + 1}. ${ingredient}`)
        .join("\n");

      await message.reply(
        `✅ **Added ingredients:**\n${newIngredients.join(", ")}\n\n` +
          `**Current ingredients:**\n${ingredientList}\n\n` +
          `Add more with \`!ingredients [ingredient name]\` or type \`!list\` to see everything.`
      );
    } else {
      await message.reply(
        "Please specify the ingredients. Example: `!ingredients Simple Syrup, Limes`"
      );
    }
  } catch (error) {
    console.error("Error handling !ingredients command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
