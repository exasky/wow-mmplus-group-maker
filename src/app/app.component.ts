import { Component, Type } from '@angular/core';
import { Player } from './models/player';
import { saveAs } from 'file-saver';
import { ALL_CLASSES, MAP_NAME_CLASS, PlayerClass } from './models/classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wowmmplus';

  selectableClasses: PlayerClass[] = ALL_CLASSES;

  creationPlayer: Player = {};
  editionPlayer: Player = {};
  players: Player[] = [];

  constructor() {
    // For debug
    for (var i = 0; i < 19; i++) {
      let randClasses = [...ALL_CLASSES].sort((a, b) => 0.5 - Math.random());
      if (i%5 === 0) {
        const cla = randClasses.find(cl => cl.availableRoles.find(r => r.type === 'Tank'))
        this.players.push({
          name: 'Tank' + Math.floor(i/5),
          keyLevel: Math.floor(i/5),
          playerClass: cla,
          role: cla!.availableRoles.find(r => r.type === 'Tank')
        })
      } else
      if ((i+1)%5 === 0) {
        const cla = randClasses.find(cl => cl.availableRoles.find(r => r.type === 'Heal'))
        this.players.push({
          name: 'Heal' + Math.floor(i/5),
          keyLevel: Math.floor(i/5),
          playerClass: cla,
          role: cla!.availableRoles.find(r => r.type === 'Heal')
        })
      } else {
        const cla = randClasses.find(cl => cl.availableRoles.find(r => r.type === 'Dps'))
        const roles = [...cla!.availableRoles].sort((a, b) => 0.5 - Math.random());
        this.players.push({
          name: 'Dps' + Math.floor(i/5),
          keyLevel: Math.floor(i/5),
          playerClass: cla,
          role: roles.find(r => r.type === 'Dps')
        })
      }
    }
  }

  exportPlayers() {
    new Date().toString;
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
        this.players = JSON.parse(reader.result as string); // as unknown as Player[];
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

  resetPlayer() {
    this.creationPlayer = {};
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }

  generate() {
    const groupedPlayers = this.players.reduce((acc, curr) => {
      acc[curr.role!.type] = (acc[curr.role!.type] || []).push(curr);
      return acc;
    }, {} as any);
    console.log(groupedPlayers)
  }
}
