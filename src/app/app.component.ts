import { Component } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { GroupType } from './shared/models/group-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'wowmmplus';

  generatedGroups: GroupType[] | undefined;

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
