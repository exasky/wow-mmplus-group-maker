import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'player-card',
  templateUrl: 'player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {
  @Input()
  player: Player = {};

  @Input()
  editable: boolean = true;

  @Input()
  createButton: boolean = false;

  @Input()
  createButtonText: string = 'Create';

  @Input()
  deleteButtonText: string = 'Delete';

  @Input()
  deleteButtonColor: string = 'warn';

  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter();
}
