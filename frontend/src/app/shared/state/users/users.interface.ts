import { IPizzaWithPrice } from './../pizzas/pizzas.interface';

export interface IUserCommon {
  id: string;
  name: string;
  username: string;
  thumbnail: string;
}

export interface IUsersTable {
  isIdentifying: boolean;
  idCurrentUser: string;

  byId: { [key: string]: IUserCommon };
  allIds: string[];
}

export interface IUserWithPizzas extends IUserCommon {
  totalPrice: number;
  pizzas: IPizzaWithPrice[];
}
