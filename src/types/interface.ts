export interface IStep {
  step: number;
  action: string;
}

export interface ISignatureCocktail {
  id: string;
  name: string;
  ingredients: string[];
  instructions: IStep[];
}

export interface ICommonCocktail {
  id: string;
  name: string;
  ingredients: string[];
  instructions: IStep[];
}
