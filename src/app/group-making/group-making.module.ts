import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { GroupMakingComponent } from './container/group-making.component';
import { ClassPipe } from '../shared/pipes/class.pipe';
import { RolePipe } from '../shared/pipes/role.pipe';
import { SelectorClass as SelectorClassComponent } from './components/player-card/selector-class/selector-class.component';
import { SelectorRole as SelectorRoleComponent } from './components/player-card/selector-role/selector-role.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GroupMakingComponent,
    SelectorClassComponent,
    SelectorRoleComponent,
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
    SharedModule
  ],
  providers: [],
  exports: [GroupMakingComponent],
})
export class GroupMakingModule {}
