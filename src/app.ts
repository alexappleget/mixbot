import cors from "cors";
import express, { Request, Response } from "express";
import { FRONTEND_URL, isProduction, PORT, prisma } from "./config";
import { seed } from "./seed";
import "./discord-bot";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/menu/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return response.status(404).json({ error: "Event not found" });
    }

    return response.json(event);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  if (!isProduction) {
    seed();
  }
  console.log(`Server is running on Port: ${PORT}`);
});
