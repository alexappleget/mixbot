import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8212;
export const isProduction = process.env.NODE_ENV === "production";
export const discordToken = process.env.DISCORD_TOKEN;

export const prisma = new PrismaClient();
