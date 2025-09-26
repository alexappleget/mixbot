import express from "express";
import { isProduction, PORT } from "./config";
import { seed } from "./seed";
import "./discord-bot";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  if (!isProduction) {
    seed();
  }
  console.log(`Server is running on Port: ${PORT}`);
});
