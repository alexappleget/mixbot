import { Message } from "discord.js";
import { eventBeers, eventDrinks, eventIngredients, eventWines } from "../maps";

export const listCommand = async (message: Message) => {
  const channelId = message.channel.id;

  try {
    const currentDrinks = eventDrinks.get(channelId) || [];
    const currentIngredients = eventIngredients.get(channelId) || [];
    const currentWines = eventWines.get(channelId) || [];
    const currentBeers = eventBeers.get(channelId) || [];

    let response = "**Current Event Details:**\n\n";

    if (currentDrinks.length === 0) {
      response += "**Signature Drinks:** None\n\n";
    } else {
      const drinkList = currentDrinks
        .map((drink, index) => `${index + 1}. ${drink}`)
        .join("\n");
      await message.reply(`**Signature drinks:**\n${drinkList}\n\n`);
    }

    if (currentBeers.length === 0) {
      response += "**Beers:** None\n\n";
    } else {
      const beerList = currentBeers
        .map((beer, index) => `${index + 1}. ${beer}`)
        .join("\n");

      response += `**Beers:**\n${beerList}\n\n`;
    }

    if (currentWines.length === 0) {
      response += "**Wines:** None\n\n";
    } else {
      const wineList = currentWines
        .map((wine, index) => `${index + 1}. ${wine}`)
        .join("\n");

      response += `**Wines:**\n${wineList}\n\n`;
    }

    if (currentIngredients.length === 0) {
      response += "**Ingredients:** None\n\n";
    } else {
      const ingredientList = currentIngredients
        .map((ingredient, index) => `${index + 1}. ${ingredient}`)
        .join("\n");

      response += `**Ingredients:**\n${ingredientList}\n\n`;
    }

    await message.reply(response);
  } catch (error) {
    console.error("Error handling !list command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
