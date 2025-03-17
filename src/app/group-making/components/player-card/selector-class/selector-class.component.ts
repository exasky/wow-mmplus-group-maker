import { Component, OnInit, Input } from '@angular/core';
import { ALL_CLASSES, PlayerClass } from 'src/app/shared/models/classes';
import { Player } from 'src/app/shared/models/player';

@Component({
    selector: 'selector-class',
    templateUrl: 'selector-class.component.html',
    styleUrls: ['../selector-commons.scss'],
    standalone: false
})

export class SelectorClass {
  @Input()
  player: Player = {}

  @Input()
  editable: boolean = false

  selectableClasses: PlayerClass[] = ALL_CLASSES
}
