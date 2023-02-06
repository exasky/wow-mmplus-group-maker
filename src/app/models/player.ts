import { CombinedRole, PlayerClass } from "./classes"

export interface Player {
  name?: string
  iLvl?: number
  playerClass?: PlayerClass
  role?: CombinedRole
  keyLevel?: number
}
