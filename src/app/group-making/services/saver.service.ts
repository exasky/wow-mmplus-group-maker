import { Injectable } from '@angular/core';
import { ALL_CLASSES } from 'src/app/shared/models/classes';
import { Player } from 'src/app/shared/models/player';

export const WOW_MMPLUS_SAVE_STORAGE_KEY = 'WOW_MMPLUS_SAVE_STORAGE_KEY';

@Injectable({ providedIn: 'root' })
export class GroupSaverService {
  constructor() {}

  saveInLS(players: Player[]) {
    localStorage.setItem(WOW_MMPLUS_SAVE_STORAGE_KEY, JSON.stringify(players));
  }

  loadFromLs(): Player[] {
    const str = localStorage.getItem(WOW_MMPLUS_SAVE_STORAGE_KEY);
    if (!str) return [];
    const players = JSON.parse(str) as Player[];

    players.forEach((player) => {
      if (player.playerClass) {
        player.playerClass = ALL_CLASSES.find(
          (pc) => pc.name == player.playerClass!.name
        );
      }
      if (player.role) {
        player.role = player.playerClass?.availableRoles.find(
          (role) =>
            role.type === player.role?.type &&
            role.location === player.role.location
        );
      }
    });
    return players;
  }
}
