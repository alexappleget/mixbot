import { Message } from "discord.js";
import { eventDrinks, eventIngredients } from "../maps";

export const listCommand = async (message: Message) => {
  const channelId = message.channel.id;

  try {
    const currentDrinks = eventDrinks.get(channelId) || [];
    const currentIngredients = eventIngredients.get(channelId) || [];

    let response = "**Current Event Details:**\n\n";

    if (currentDrinks.length === 0) {
      response += "**Signature Drinks:** None\n\n";
    } else {
      const drinkList = currentDrinks
        .map((drink, index) => `${index + 1}. ${drink}`)
        .join("\n");
      await message.reply(`**Signature drinks:**\n${drinkList}`);
    }

    if (currentIngredients.length === 0) {
      response += "**Ingredients:** None";
    } else {
      const ingredientList = currentIngredients
        .map((ingredient, index) => `${index + 1}. ${ingredient}`)
        .join("\n");

      response += `**Ingredients:**\n${ingredientList}`;
    }

    await message.reply(response);
  } catch (error) {
    console.error("Error handling !list command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
