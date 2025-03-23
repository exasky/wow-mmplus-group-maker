import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ALL_CLASSES, PlayerClass } from 'src/app/shared/models/classes';
import { Player } from 'src/app/shared/models/player';
import { ClassPipe } from 'src/app/shared/pipes/class.pipe';

@Component({
  selector: 'selector-class',
  imports: [MatFormFieldModule, MatSelectModule, ClassPipe, CommonModule],
  templateUrl: 'selector-class.component.html',
  styleUrls: ['../selector-commons.scss'],
})
export class SelectorClass {
  @Input()
  player: Player = {};

  editable = input<boolean>(false);

  selectableClasses: PlayerClass[] = ALL_CLASSES;

  compareWith(o1: PlayerClass, o2: PlayerClass): boolean {
    if (o1 == o2) return true
    if (!o1 || ! o2) return false
    return o1.name == o2.name
  }
}
