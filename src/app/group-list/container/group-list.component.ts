import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupType } from 'src/app/shared/models/group-type';
import { Player } from 'src/app/shared/models/player';
import { saveAs } from 'file-saver';

@Component({
  selector: 'group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  @Input()
  groupList: GroupType[] | undefined;

  @Output()
  stepBack: EventEmitter<void> = new EventEmitter();

  constructor() {}

  addGroup() {
    this.groupList?.push({
      dpsNb: 0,
      hasBl: false,
      hasHeal: false,
      hasTank: false,
      hasBr: false,
      keyLevel: 0,
      players: [],
      name: '',
    });
  }

  deleteGroup(index: number) {
    this.groupList?.splice(index, 1);
  }

  exportGroups() {
    console.log(this.groupList);

    const replacer = (_: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here

    const fieldsToExport: (keyof GroupType)[] = ['name', 'keyLevel', 'players'];
    let csv = this.groupList!.map((row) =>
      fieldsToExport
        .flatMap((fieldName) => {
          if (fieldName !== 'players')
            return [JSON.stringify(row[fieldName], replacer)];

          return row.players.map((player) => player.name);
        })
        .join(',')
    );
    csv.unshift(
      [
        'Group name',
        'Key level',
        'player 1',
        'player 2',
        'player 3',
        'player 4',
        'player 5',
      ].join(',')
    );
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, `wow-group-list-export-${new Date().toISOString()}.csv`);
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
