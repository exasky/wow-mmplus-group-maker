import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { ClassPipe } from 'src/app/shared/pipes/class.pipe';
import { RolePipe } from 'src/app/shared/pipes/role.pipe';

@Component({
  selector: 'player-list-item',
  imports: [RolePipe, ClassPipe],
  templateUrl: 'player-list-item.component.html',
  styleUrls: ['player-list-item.component.scss'],
})
export class PlayerListItemComponent {
  @Input()
  player: Player | undefined;
}
