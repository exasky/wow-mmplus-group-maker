import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { saveAsJSON } from 'src/app/shared/file-saver';
import {
  ALL_CLASSES,
  MAP_NAME_CLASS,
  PlayerClass,
} from 'src/app/shared/models/classes';
import { GroupType } from 'src/app/shared/models/group-type';
import { Player } from 'src/app/shared/models/player';
import {
  PlayerListFilter,
  PlayerListFilterComponent,
} from '../components/filter/player-list-filter.component';
import { PlayerCardComponent } from '../components/player-card/player-card.component';
import { GroupMakerService } from '../services/group-maker.service';
import { GroupSaverService } from '../services/saver.service';

@Component({
  selector: 'group-making',
  imports: [
    MatButtonModule,
    MatIcon,
    PlayerListFilterComponent,
    PlayerCardComponent,
    CommonModule,
  ],
  templateUrl: 'group-making.component.html',
  styleUrls: ['group-making.component.scss'],
})
export class GroupMakingComponent implements OnInit {
  selectableClasses: PlayerClass[] = ALL_CLASSES;

  creationPlayer: Player = { available: true };
  editionPlayer: Player = {};

  players: Player[] = [];
  displayedPlayers: Player[] = [];
  filter: PlayerListFilter = {};

  @Output()
  groupsGenerated: EventEmitter<GroupType[]> = new EventEmitter();

  constructor(private groupMakerService: GroupMakerService, private groupSaverService: GroupSaverService) {
  }

  ngOnInit(): void {
    this.players = this.groupSaverService.loadFromLs()
    this.filterPlayers(this.filter)
  }

  randomize() {
    this.players = [];
    // For debug
    for (var i = 0; i < 18; i++) {
      let randClasses = [...ALL_CLASSES].sort(() => 0.5 - Math.random());
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
        const roles = [...cla!.availableRoles].sort(() => 0.5 - Math.random());
        this.players.push({
          name: 'Dps' + Math.floor(i / 5),
          keyLevel: Math.floor(i / 5),
          playerClass: cla,
          role: roles.find((r) => r.type === 'Dps'),
          available: true,
        });
      }
    }
    this.filterPlayers(this.filter);
  }

  exportPlayers() {
    saveAsJSON(JSON.stringify(this.players), `wow-groups-${new Date().toISOString()}.json`);
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
        this.filterPlayers(this.filter)
      };

      reader.readAsText(inputNode.files[0]);
    }
  }

  filterPlayers(filter: PlayerListFilter) {
    this.filter = filter;
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
    this.groupSaverService.saveInLS(this.players)
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
    this.groupSaverService.saveInLS(this.players)
  }

  generate() {
    // TODO : check if all cards fulfilled correctly -> Use FormGroups :)
    // Then this.form.onChange(() => saveInLS)
    this.groupSaverService.saveInLS(this.players)
    const availablePlayers = this.players.filter((player) => player.available);
    const groups = this.groupMakerService.generateGroups(availablePlayers);
    this.groupsGenerated.emit(groups);
  }
}
