import { Message } from "discord.js";
import { eventDrinks } from "../maps";
import { capitalizeWords } from "../util";

export const drinksCommand = async (message: Message) => {
  const channelId = message.channel.id;
  const drinksText = message.content.slice(7).trim();

  try {
    if (drinksText.toLowerCase() === "none") {
      eventDrinks.set(channelId, []);

      await message.reply("✅ Got it! No signature drinks for this event.");
    } else if (drinksText) {
      const currentDrinks = eventDrinks.get(channelId) || [];

      const newDrinks = drinksText
        .split(",")
        .map((drink) => capitalizeWords(drink.trim()));

      const allDrinks = [...new Set([...currentDrinks, ...newDrinks])];
      eventDrinks.set(channelId, allDrinks);

      const drinkList = allDrinks
        .map((drink, index) => `${index + 1}. ${drink}`)
        .join("\n");

      await message.reply(
        `✅ **Added to signature drinks:**\n${newDrinks.join(", ")}\n\n` +
          `**Current list:**\n${drinkList}\n\n` +
          `Add more with \`!drinks [drink name]\` or type \`!list\` to see everything.`
      );
    } else {
      await message.reply("Please specify the drinks or type `!drinks none`");
    }
  } catch (error) {
    console.error("Error handling !drinks command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
