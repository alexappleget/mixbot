import { clearCommand } from "./commands/clear";
import { drinksCommand } from "./commands/drinks";
import { eventCommand } from "./commands/event";
import { ingredientsCommand } from "./commands/ingredients";
import { listCommand } from "./commands/list";
import { startCommand } from "./commands/start";

export const commands = {
  event: eventCommand,
  drinks: drinksCommand,
  ingredients: ingredientsCommand,
  list: listCommand,
  clear: clearCommand,
  start: startCommand,
};
