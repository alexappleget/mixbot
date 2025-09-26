import { randomUUID } from "crypto";
import { ICommonCocktail, ISignatureCocktail } from "./types/interface";
import { prisma } from "./config";
import { Prisma } from "@prisma/client";

const toJsonArray = (
  steps: { step: number; action: string }[]
): Prisma.JsonArray => {
  return steps.map((step) => ({ step: step.step, action: step.action }));
};

let signatureCocktails: ISignatureCocktail[] = [
  {
    id: randomUUID(),
    name: "House Margarita",
    ingredients: ["tequila", "simple syrup", "sour mix", "limes"],
    instructions: [
      { step: 1, action: "Grab glass, salt rim, and add ice." },
      { step: 2, action: "Pour tequila for 6 count in shaker." },
      { step: 3, action: "Pour simple syrup for 2 count in shaker." },
      { step: 4, action: "Pour sour mix for 6 count in shaker." },
      {
        step: 5,
        action: "Shake mixer, strain into glass, and serve with lime garnish.",
      },
    ],
  },
];

let commonCocktails: ICommonCocktail[] = [
  {
    id: randomUUID(),
    name: "Cosmopolitan",
    ingredients: [
      "vodka",
      "triple sec",
      "lime juice",
      "cranberry juice",
      "limes",
    ],
    instructions: [
      { step: 1, action: "Add light ice into glass." },
      { step: 2, action: "Pour vodka for 6 count in shaker." },
      { step: 3, action: "Pour triple sec for 2 count in shaker." },
      { step: 4, action: "Pour lime juice for 2 count in shaker." },
      { step: 5, action: "Pour cranberry juice for 2 count in shaker." },
      {
        step: 6,
        action: "Shake mixer, strain into glass, and serve with lime garnish.",
      },
    ],
  },
  {
    id: randomUUID(),
    name: "Moscow Mule",
    ingredients: ["vodka", "lime juice", "ginger beer", "limes"],
    instructions: [
      { step: 1, action: "Pour vodka for 5 count into glass." },
      { step: 2, action: "Pour lime juice for 2 count into glass." },
      { step: 3, action: "Add ice into glass." },
      { step: 4, action: "Top off drink with ginger beer." },
      { step: 5, action: "Stir and serve with lime garnish." },
    ],
  },
  {
    id: randomUUID(),
    name: "Old Fashioned",
    ingredients: ["bourbon", "simple syrup", "cherries", "oranges", "bitters"],
    instructions: [
      { step: 1, action: "Add ice into glass." },
      { step: 2, action: "Pour a little bit of simple syrup." },
      { step: 3, action: "Pour bourbon for 6 count." },
      { step: 4, action: "Add 2 shakes of bitters." },
      { step: 5, action: "Add orange peel and a cherry" },
      { step: 6, action: "Stir and serve." },
    ],
  },
  {
    id: randomUUID(),
    name: "Whiskey Sour",
    ingredients: ["bourbon", "simple syrup", "lemon juice", "lemons"],
    instructions: [
      { step: 1, action: "Add ice into glass." },
      { step: 2, action: "Pour bourbon for 6 count in shaker." },
      { step: 3, action: "Pour lemon juice for 3 count in shaker." },
      { step: 4, action: "Pour simple syrup for 3 count in shaker." },
      {
        step: 5,
        action: "Shake mixer, strain into glass, and serve with lemon garnish.",
      },
    ],
  },
];

export const seed = async () => {
  for (let signatureCocktail of signatureCocktails) {
    const existingSignatureCocktail = await prisma.signatureDrink.findUnique({
      where: { name: signatureCocktail.name },
    });

    if (existingSignatureCocktail) continue;

    await prisma.signatureDrink.create({
      data: {
        id: signatureCocktail.id,
        name: signatureCocktail.name,
        ingredients: signatureCocktail.ingredients,
        instructions: toJsonArray(signatureCocktail.instructions),
      },
    });
  }

  for (let commonCocktail of commonCocktails) {
    const existingCommonCocktail = await prisma.commonCocktail.findUnique({
      where: { name: commonCocktail.name },
    });

    if (existingCommonCocktail) continue;

    await prisma.commonCocktail.create({
      data: {
        id: commonCocktail.id,
        name: commonCocktail.name,
        ingredients: commonCocktail.ingredients,
        instructions: toJsonArray(commonCocktail.instructions),
      },
    });
  }

  console.log("Drinks seeded.");
};
