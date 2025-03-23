import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CombinedRole } from 'src/app/shared/models/classes';
import { RolePipe } from 'src/app/shared/pipes/role.pipe';

@Component({
  selector: 'selector-role',
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, RolePipe],
  templateUrl: 'selector-role.component.html',
  styleUrls: ['../selector-commons.scss'],
})
export class SelectorRole {
  availableRoles = input<CombinedRole[]>([]);
  defaultRole = input<CombinedRole | undefined>();
  editable = input<boolean>(false);
  canResetChoice = input<boolean>(false);

  newRole = output<CombinedRole>();

  compareWith(o1: CombinedRole, o2: CombinedRole): boolean {
    if (o1 == o2) return true
    if (!o1 || ! o2) return false
    return o1.type == o2.type
  }
}
