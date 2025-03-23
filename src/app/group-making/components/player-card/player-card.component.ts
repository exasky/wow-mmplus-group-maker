import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { Player } from 'src/app/shared/models/player';
import { SelectorClass } from './selector-class/selector-class.component';
import { SelectorRole } from './selector-role/selector-role.component';

@Component({
  selector: 'player-card',
  imports: [
    FormsModule,
    MatCardModule,
    MatCheckbox,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    SelectorClass,
    SelectorRole,
  ],
  templateUrl: 'player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  @Input()
  player : Player = {};
  editable = input<boolean>(false);
  createButton = input<boolean>(false);
  createButtonText = input<string>('Create');
  deleteButtonText = input<string>('Delete');
  deleteButtonColor = input<string>('warn');

  onUpdate = output<any>();
  onDelete = output<any>();
}
