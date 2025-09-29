import { Message } from "discord.js";
import { eventWines } from "../maps";
import { capitalizeWords } from "../util";

export const winesCommand = async (message: Message) => {
  const channelId = message.channel.id;
  const winesText = message.content.slice(6).trim();

  try {
    if (winesText) {
      const currentWines = eventWines.get(channelId) || [];

      const newWines = winesText
        .split(",")
        .map((wine) => capitalizeWords(wine.trim()));

      const allWines = [...new Set([...currentWines, ...newWines])];
      eventWines.set(channelId, allWines);

      const wineList = allWines
        .map((wine, index) => `${index + 1}. ${wine}`)
        .join("\n");

      await message.reply(
        `✅ **Added wines:**\n${newWines.join(", ")}\n\n` +
          `**Current wines:**\n${wineList}\n\n` +
          `Add more with \`!wines [wine name]\` or type \`!list\` to see everything.`
      );
    } else {
      await message.reply(
        "Please specify the wines. Example: `!wines Pinot Grigio, Rose, Prosecco`"
      );
    }
  } catch (error) {
    console.error("Error handling !wines command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
