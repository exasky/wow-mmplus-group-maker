import { Component, EventEmitter, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import {
  ALL_CLASSES,
  MAP_NAME_CLASS,
  PlayerClass,
} from 'src/app/shared/models/classes';
import { GroupType } from 'src/app/shared/models/group-type';
import { Player } from 'src/app/shared/models/player';
import { GroupMakerService } from '../services/group-maker.service';

@Component({
  selector: 'group-making',
  templateUrl: 'group-making.component.html',
  styleUrls: ['group-making.component.scss'],
})
export class GroupMakingComponent {
  selectableClasses: PlayerClass[] = ALL_CLASSES;

  creationPlayer: Player = {};
  editionPlayer: Player = {};
  players: Player[] = [];

  @Output()
  groupsGenerated: EventEmitter<GroupType[]> = new EventEmitter();

  constructor(private groupMakerService: GroupMakerService) {
    // For debug
    for (var i = 0; i < 18; i++) {
      let randClasses = [...ALL_CLASSES].sort((a, b) => 0.5 - Math.random());
      if (i % 5 === 0) {
        const cla = randClasses.find((cl) =>
          cl.availableRoles.find((r) => r.type === 'Tank')
        );
        this.players.push({
          name: 'Tank' + Math.floor(i / 5),
          keyLevel: Math.floor(i / 5),
          playerClass: cla,
          role: cla!.availableRoles.find((r) => r.type === 'Tank'),
        });
      } else if ((i - 1) % 5 === 0) {
        const cla = randClasses.find((cl) =>
          cl.availableRoles.find((r) => r.type === 'Heal')
        );
        this.players.push({
          name: 'Heal' + Math.floor(i / 5),
          keyLevel: Math.floor(i / 5),
          playerClass: cla,
          role: cla!.availableRoles.find((r) => r.type === 'Heal'),
        });
      } else {
        const cla = randClasses.find((cl) =>
          cl.availableRoles.find((r) => r.type === 'Dps')
        );
        const roles = [...cla!.availableRoles].sort(
          (a, b) => 0.5 - Math.random()
        );
        this.players.push({
          name: 'Dps' + Math.floor(i / 5),
          keyLevel: Math.floor(i / 5),
          playerClass: cla,
          role: roles.find((r) => r.type === 'Dps'),
        });
      }
    }
  }

  exportPlayers() {
    saveAs(
      new Blob([JSON.stringify(this.players)], { type: 'JSON' }),
      `wow-groups-${new Date().toISOString()}.json`
    );
  }

  importPlayers() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.players = JSON.parse(reader.result as string);
        this.players.forEach((player) => {
          player.playerClass = MAP_NAME_CLASS[player.playerClass?.name as any];
          player.role = player.playerClass?.availableRoles.find(
            (role) =>
              role.type === player.role?.type &&
              role.location === player.role.location
          );
        });
      };

      reader.readAsText(inputNode.files[0]);
    }
  }

  addPlayer() {
    this.players.push(this.creationPlayer);
    this.creationPlayer = {};
  }

  resetCreationPlayer() {
    this.creationPlayer = {};
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }

  generate() {
    // TODO : check if all cards fulfilled correctly
    const groups = this.groupMakerService.generateGroups(this.players);
    console.log(groups);
    this.groupsGenerated.emit(groups);
  }
}
