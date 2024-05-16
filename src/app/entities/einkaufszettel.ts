import {Artikel} from "./artikel";
import {User} from "./user";

export interface Einkaufszettel {
  id: number;
  name: string;
  artikels?: Artikel[];
  users: User[];
}
