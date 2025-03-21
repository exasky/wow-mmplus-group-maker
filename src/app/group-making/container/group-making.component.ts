import { Component, EventEmitter, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import {
  ALL_CLASSES,
  MAP_NAME_CLASS,
  PlayerClass,
} from 'src/app/shared/models/classes';
import { GroupType } from 'src/app/shared/models/group-type';
import { Player } from 'src/app/shared/models/player';
import { PlayerListFilter } from '../components/filter/player-list-filter.component';
import { GroupMakerService } from '../services/group-maker.service';

@Component({
  selector: 'group-making',
  templateUrl: 'group-making.component.html',
  styleUrls: ['group-making.component.scss'],
  standalone: false,
})
export class GroupMakingComponent {
  selectableClasses: PlayerClass[] = ALL_CLASSES;

  creationPlayer: Player = { available: true };
  editionPlayer: Player = {};

  players: Player[] = [];
  displayedPlayers: Player[] = [];

  @Output()
  groupsGenerated: EventEmitter<GroupType[]> = new EventEmitter();

  constructor(private groupMakerService: GroupMakerService) {
  }

  randomize() {
    this.players = [];
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
          available: true,
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
          available: true,
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
          available: true,
        });
      }
    }
    this.filterPlayers({});
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

  filterPlayers(filter: PlayerListFilter) {
    this.displayedPlayers = this.players.filter(
      (player) =>
        (!filter.name || player.name?.indexOf(filter.name) !== -1) &&
        (!filter.role || player.role?.type === filter.role.type) &&
        (filter.keyLevel === undefined || player.keyLevel === filter.keyLevel)
    );
  }

  addPlayer() {
    this.players.push(this.creationPlayer);
    this.displayedPlayers.push(this.creationPlayer);
    this.creationPlayer = {};
  }

  resetCreationPlayer() {
    this.creationPlayer = {};
  }

  deletePlayer(index: number) {
    const removedPlayer = this.displayedPlayers.splice(index, 1)[0];
    this.players.splice(
      this.players.findIndex((p) => p === removedPlayer),
      1
    );
  }

  generate() {
    // TODO : check if all cards fulfilled correctly
    const availablePlayers = this.players.filter((player) => player.available);
    const groups = this.groupMakerService.generateGroups(availablePlayers);
    this.groupsGenerated.emit(groups);
  }
}
