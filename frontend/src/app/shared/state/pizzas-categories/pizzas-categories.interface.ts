import { IPizzaCommon } from './../pizzas/pizzas.interface';

export interface IPizzaCategoryCommon {
  id: string;
  name: string;
  pizzasIds: string[];
}

export interface IPizzasCategoriesTable {
  byId: { [key: string]: IPizzaCategoryCommon };
  allIds: string[];
}

export interface IPizzaCategoryWithPizzas extends IPizzaCategoryCommon {
  pizzas: IPizzaCommon[];
}
