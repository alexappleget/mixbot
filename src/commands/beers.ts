import { Message } from "discord.js";
import { eventBeers } from "../maps";
import { capitalizeWords } from "../util";

export const beersCommands = async (message: Message) => {
  const channelId = message.channel.id;
  const beersText = message.content.slice(6).trim();

  try {
    if (beersText) {
      const currentBeers = eventBeers.get(channelId) || [];

      const newBeers = beersText
        .split(",")
        .map((beer) => capitalizeWords(beer.trim()));

      const allBeers = [...new Set([...currentBeers, ...newBeers])];
      eventBeers.set(channelId, allBeers);

      const beerList = allBeers
        .map((wine, index) => `${index + 1}. ${wine}`)
        .join("\n");

      await message.reply(
        `✅ **Added beers:**\n${newBeers.join(", ")}\n\n` +
          `**Current beers:**\n${beerList}\n\n` +
          `Add more with \`!beers [beer name]\` or type \`!list\` to see everything.`
      );
    } else {
      await message.reply(
        "Please specify the wines. Example: `!beers Pacifico, Shiner Bock, Bud Light`"
      );
    }
  } catch (error) {
    console.error("Error handling !beers command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
