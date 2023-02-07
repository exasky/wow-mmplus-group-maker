import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { GroupMakingModule } from './group-making/group-making.module';
import { GroupListModule } from './group-list/group-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, GroupMakingModule, GroupListModule, MatToolbarModule, MatStepperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
