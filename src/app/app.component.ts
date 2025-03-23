import { Component } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { GroupType } from './shared/models/group-type';
import { MatToolbar } from '@angular/material/toolbar';
import { GroupMakingComponent } from './group-making/container/group-making.component';
import { GroupListComponent } from './group-list/container/group-list.component';

@Component({
    selector: 'app-root',
    imports: [
      MatToolbar,
      MatStepper,
      MatStep,
      GroupMakingComponent,
      GroupListComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'WoW - MM+';

  generatedGroups: GroupType[] = [];

  constructor() {}

  onGroupsGenerated(groups: GroupType[], stepper: MatStepper) {
    this.generatedGroups = groups;
    stepper.selected!.completed = true;
    stepper.next()
  }

  stepBack(stepper: MatStepper) {
    stepper.previous()
    stepper.selected!.completed = false;
  }
}
