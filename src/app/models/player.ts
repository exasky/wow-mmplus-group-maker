import { CombinedRole, PlayerClass } from "./classes"

export interface Player {
  name?: string
  iLvl?: number
  playerClass?: PlayerClass
  role?: CombinedRole
  keyLevel?: number
}

export const playerHasBl = (p: Player) => p.playerClass?.noticeableSpells.indexOf('BL') !== -1;
export const playerHasBr = (p: Player) => p.playerClass?.noticeableSpells.indexOf('BR') !== -1;
