import { Component, Type } from '@angular/core';
import * as classes from './models/classes';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wowmmplus';

  selectableClasses: classes.PlayerClass[] = classes.ALL_CLASSES

  creationPlayer: Player = {}
  editionPlayer: Player = {};
  players: Player[] = [];

  addPlayer() {
    this.players.push(this.creationPlayer);
    this.creationPlayer = {};
  }

  editPlayer() {

  }
}
