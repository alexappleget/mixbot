import { Message } from "discord.js";
import { eventBeers, eventDrinks, eventIngredients, eventWines } from "../maps";

export const eventCommand = async (message: Message) => {
  const channelId = message.channel.id;

  try {
    eventDrinks.set(channelId, []);
    eventBeers.set(channelId, []);
    eventWines.set(channelId, []);
    eventIngredients.set(channelId, []);

    await message.reply(
      "🍹 **New Event Started!**\n\n" +
        "Add signature drinks by typing:\n" +
        "• `!drinks none` if there are no signature drinks\n" +
        "• `!drinks House Margarita` to add a single drink\n" +
        "• `!drinks Mojito, Margarita` to add multiple drinks\n\n" +
        "Add wines by typing:\n" +
        "• `!wine Pinot Grigio, Rose, Prosecco` to add wines\n\n" +
        "Add ingredients by typing:\n" +
        "• `!ingredients Simple Syrup, Cherries, Limes` to add ingredients\n\n" +
        "Other commands:\n" +
        "• `!list` to see current drinks and ingredients\n" +
        "• `!clear` to clear everything"
    );
  } catch (error) {
    console.error("Error handling !event command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
