import { Component, OnInit, Input } from '@angular/core';
import { ALL_CLASSES, PlayerClass } from 'src/app/models/classes';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'selector-class',
  templateUrl: 'selector-class.component.html',
  styleUrls: ['../selector-commons.scss']
})

export class SelectorClass {
  @Input()
  player: Player = {}

  @Input()
  editable: boolean = false

  selectableClasses: PlayerClass[] = ALL_CLASSES
}
