import { Component, OnInit, Input } from '@angular/core';
import { ALL_CLASSES, PlayerClass } from 'src/app/shared/models/classes';
import { Player } from 'src/app/shared/models/player';

@Component({
  selector: 'selector-role',
  templateUrl: 'selector-role.component.html',
  styleUrls: ['../selector-commons.scss']
})

export class SelectorRole {
  @Input()
  player: Player = {}

  @Input()
  editable: boolean = false

  selectableClasses: PlayerClass[] = ALL_CLASSES
}
