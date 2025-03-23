import { Pipe, PipeTransform, Type } from '@angular/core';
import {
  CombinedRole,
} from '../models/classes';

@Pipe({
  name: 'roleIcon',
})
export class RolePipe implements PipeTransform {
  transform(value: CombinedRole | undefined, ...args: any[]): any {
    const icon = (() => {
      switch (value?.type) {
        case 'Dps':
          return value?.location === 'Melee' ? 'dps.png' : 'ranged.png';
        case 'Heal':
          return 'heal.png';
        case 'Tank':
          return 'tank.png';
        default:
          return '';
      }
    })();

    return `assets/roles/${icon}`;
  }
}
