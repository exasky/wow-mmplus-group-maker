import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CombinedRole } from 'src/app/shared/models/classes';

@Component({
    selector: 'selector-role',
    templateUrl: 'selector-role.component.html',
    styleUrls: ['../selector-commons.scss'],
    standalone: false
})
export class SelectorRole {
  @Input()
  availableRoles?: CombinedRole[] = [];

  @Input()
  defaultRole?: CombinedRole;

  @Input()
  editable: boolean = false;

  @Input()
  canResetChoice: boolean = false;

  @Output()
  newRole: EventEmitter<CombinedRole> = new EventEmitter();
}
