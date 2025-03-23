import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  linkedSignal,
  output,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { GroupType } from 'src/app/shared/models/group-type';
import { Player } from 'src/app/shared/models/player';
import { PlayerListItemComponent } from '../components/player-list-item/player-list-item.component';
import { saveAsCSV } from 'src/app/shared/file-saver';

@Component({
  selector: 'group-list',
  imports: [
    MatButtonModule,
    MatIcon,
    MatCardModule,
    DragDropModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    PlayerListItemComponent,
  ],
  templateUrl: 'group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  groupList = input<GroupType[]>([]);
  computedGroups = linkedSignal(() => this.groupList())

  stepBack = output<void>();

  constructor() {}

  addGroup() {
    this.computedGroups.set([...this.computedGroups(),{
      dpsNb: 0,
      hasBl: false,
      hasHeal: false,
      hasTank: false,
      hasBr: false,
      keyLevel: 0,
      players: [],
      name: '',
    }])
  }

  deleteGroup(index: number) {
    const groups = this.computedGroups()
    groups.splice(index, 1);
    this.computedGroups.set(groups)
  }

  exportGroups() {
    console.log(this.groupList);

    const replacer = (_: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here

    const fieldsToExport: (keyof GroupType)[] = ['name', 'keyLevel', 'players'];
    let csv = this.groupList().map((row) =>
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

    saveAsCSV(csvArray, `wow-group-list-export-${new Date().toISOString()}.csv`)
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
