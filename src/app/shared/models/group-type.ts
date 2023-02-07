import { Player } from "./player";

export type GroupType = {
  name?: string;
  players: Player[];
  keyLevel: number;
  hasTank: boolean;
  hasHeal: boolean;
  dpsNb: number;
  hasBl: boolean;
  hasBr: boolean;
};
