import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { PlayerListItemComponent } from './components/player-list-item/player-list-item.component';
import { GroupListComponent } from './container/group-list.component';

@NgModule({
  declarations: [GroupListComponent, PlayerListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
    MatListModule,
    SharedModule
  ],
  providers: [],
  exports: [GroupListComponent],
})
export class GroupListModule {}
