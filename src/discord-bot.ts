import { Client, GatewayIntentBits } from "discord.js";
import { discordToken } from "./config";
import { commands } from "./commands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Discord bot logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  for (const [commandName, handler] of Object.entries(commands)) {
    if (content.startsWith(`!${commandName}`)) {
      await handler(message);
      return;
    }
  }
});

client.login(discordToken);
