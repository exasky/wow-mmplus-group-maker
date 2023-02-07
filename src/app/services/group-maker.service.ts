import { Injectable } from '@angular/core';
import { playerHasBl, playerHasBr, Player } from '../models/player';

type GroupType = {
  players: Player[];
  keyLevel: number;
  hasTank: boolean;
  hasHeal: boolean;
  dpsNb: number;
  hasBl: boolean;
  hasBr: boolean;
};

@Injectable({ providedIn: 'root' })
export class GroupMakerService {
  constructor() {}

  generateGroups(players: Player[]): GroupType[] {
    const groupedPlayers = players.reduce((acc, curr) => {
      if (!acc[curr.role!.type]) {
        acc[curr.role!.type] = [];
      }
      acc[curr.role!.type].push(curr);
      return acc;
    }, {} as any);
    console.log(groupedPlayers);

    const returnGroups: GroupType[] = [];

    // Start with tanks so create group each time
    groupedPlayers.Tank.forEach((tank: Player) =>
      this.addPlayerToNewGroup(tank, returnGroups)
    );

    // Add heal in groups according to prev tank insertions
    groupedPlayers.Heal.forEach((heal: Player) => {
      let grpFound = this.findGroupFor(returnGroups, heal, this.healRoleCheck);

      if (!grpFound) {
        this.addPlayerToNewGroup(heal, returnGroups);
      } else {
        this.addPlayerToExistingGroup(heal, grpFound);
      }
    });

    // Do 2 loops here : first for find 'perfect groups match' and distributing NoticeableSpells
    const aloneDps: Player[] = [];
    groupedPlayers.Dps.forEach((dps: Player) => {
      let groupFound = this.findGroupFor(returnGroups, dps, this.dpsRoleCheck);

      if (!groupFound) {
        aloneDps.push(dps);
      } else {
        this.addPlayerToExistingGroup(dps, groupFound);
      }
    });

    // For each remaining alone dps, try to set it in a group
    aloneDps.forEach((dps) => {
      let grp = this.findGroupFor(returnGroups, dps, this.dpsRoleCheck, false);
      if (!grp) {
        this.addPlayerToNewGroup(dps, returnGroups);
      } else {
        this.addPlayerToExistingGroup(dps, grp);
      }
    });

    return returnGroups;
  }

  private findGroupFor(
    groups: GroupType[],
    player: Player,
    roleFunc: Function,
    checkNoticeableSpells: boolean = true
  ) {
    const hasBl = playerHasBl(player);
    const hasBr = playerHasBr(player);
    let almostFoundGroup: GroupType | undefined = undefined;
    const foundGroup = groups.find((grp) => {
      if (
        checkNoticeableSpells &&
        ((hasBl && grp.hasBl) || (hasBr && grp.hasBr))
      ) {
        // Avoid multiple BL or BR in same group
        return false;
      }
      if (!roleFunc(grp)) {
        return false;
      }
      if (!almostFoundGroup && this.almostCheckKey(grp, player.keyLevel!)) {
        almostFoundGroup = grp;
      }
      return this.strictCheckKey(grp, player.keyLevel!);
    });

    return foundGroup ? foundGroup : almostFoundGroup;
  }

  private healRoleCheck = (grp: GroupType) => !grp.hasHeal;
  private dpsRoleCheck = (grp: GroupType) => grp.dpsNb < 3;
  private strictCheckKey = (grp: GroupType, kl: number) => grp.keyLevel === kl;
  private almostCheckKey = (g: GroupType, kl: number) =>
    g.keyLevel - 1 <= kl && kl <= g.keyLevel + 1;

  private addPlayerToNewGroup(p: Player, grps: GroupType[]) {
    grps.push({
      players: [p],
      keyLevel: p.keyLevel!,
      hasTank: p.role!.type === 'Tank',
      hasHeal: p.role!.type === 'Heal',
      dpsNb: p.role!.type === 'Dps' ? 1 : 0,
      hasBl: p.playerClass!.noticeableSpells.indexOf('BL') !== -1,
      hasBr: p.playerClass!.noticeableSpells.indexOf('BR') !== -1,
    });
  }

  private addPlayerToExistingGroup(p: Player, grp: GroupType) {
    switch (p.role?.type) {
      case 'Tank':
        grp.hasTank = true;
        break;
      case 'Heal':
        grp.hasHeal = true;
        break;
      case 'Dps':
        grp.dpsNb++;
        break;
    }

    grp.hasBl = grp.hasBl || playerHasBl(p);
    grp.hasBr = grp.hasBr || playerHasBr(p);
    grp.players.push(p);
  }
}
