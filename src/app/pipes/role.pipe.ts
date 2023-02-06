import { Pipe, PipeTransform, Type } from '@angular/core';
import {
  PlayerClass,
  DH,
  DK,
  Druid,
  Evoker,
  Hunter,
  Mage,
  Monk,
  Paladin,
  Priest,
  Rogue,
  Shaman,
  Warlock,
  Warrior,
  CombinedRole,
} from '../models/classes';

@Pipe({
  name: 'classIcon',
})
export class ClassPipe implements PipeTransform {
  transform(value: PlayerClass, ...args: any[]): any {
    const icon = (() => {
      switch (value) {
        case Warrior:
          return 'warrior.png';
        case Paladin:
          return 'paladin.png';
        case Hunter:
          return 'hunter.png';
        case Rogue:
          return 'rogue.png';
        case Priest:
          return 'priest.png';
        case Shaman:
          return 'shaman.png';
        case Mage:
          return 'mage.png';
        case Warlock:
          return 'warlock.png';
        case Monk:
          return 'monk.png';
        case Druid:
          return 'druid.png';
        case DH:
          return 'demonhunter.png';
        case DK:
          return 'deathknight.png';
        case Evoker:
          return 'evoker.png';
        default:
          return '';
      }
    })();

    return `assets/classes/${icon}`;
  }
}
