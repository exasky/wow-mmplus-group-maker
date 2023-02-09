import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { PlayerListFilterComponent } from './components/filter/player-list-filter.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { SelectorClass as SelectorClassComponent } from './components/player-card/selector-class/selector-class.component';
import { SelectorRole as SelectorRoleComponent } from './components/player-card/selector-role/selector-role.component';
import { GroupMakingComponent } from './container/group-making.component';

@NgModule({
  declarations: [
    GroupMakingComponent,
    SelectorClassComponent,
    SelectorRoleComponent,
    PlayerListFilterComponent,
    PlayerCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    SharedModule
  ],
  providers: [],
  exports: [GroupMakingComponent],
})
export class GroupMakingModule {}
