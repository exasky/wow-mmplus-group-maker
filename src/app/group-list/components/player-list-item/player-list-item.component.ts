import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';

@Component({
  selector: 'player-list-item',
  templateUrl: 'player-list-item.component.html',
  styleUrls: ['player-list-item.component.scss']
})

export class PlayerListItemComponent  {

  @Input()
  player: Player | undefined
}
