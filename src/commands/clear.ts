import { Message } from "discord.js";
import { eventDrinks, eventIngredients } from "../maps";

export const clearCommand = async (message: Message) => {
  const channelId = message.channel.id;

  try {
    eventDrinks.set(channelId, []);
    eventIngredients.set(channelId, []);

    await message.reply("✅ Signature drinks list cleared!");
  } catch (error) {
    console.error("Error handling !clear command:", error);
    await message.reply("Sorry, something went wrong!");
  }
};
