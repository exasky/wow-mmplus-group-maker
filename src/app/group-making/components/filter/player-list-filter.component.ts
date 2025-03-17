import { Component, EventEmitter, Output } from '@angular/core';
import { CombinedRole } from 'src/app/shared/models/classes';

export type PlayerListFilter = {
  name?: string;
  role?: CombinedRole;
  keyLevel?: number;
};

@Component({
    selector: 'player-list-filter',
    templateUrl: 'player-list-filter.component.html',
    styleUrls: ['player-list-filter.component.scss'],
    standalone: false
})
export class PlayerListFilterComponent {
  @Output()
  filterChange: EventEmitter<PlayerListFilter> = new EventEmitter();

  availableRoles: CombinedRole[] = [
    {type: 'Tank', location: 'Melee'},
    {type: 'Heal', location: 'Melee'},
    {type: 'Dps', location: 'Melee'},
  ]

  filters: PlayerListFilter = {};

  constructor() {}

  updateNameFilter(event: any) {
    this.filters.name = event.target.value;
    this.filterChange.emit(this.filters);
  }

  updateRoleFilter(role: CombinedRole) {
    this.filters.role = role;
    this.filterChange.emit(this.filters);
  }

  updateKeyLevelFilter(event: any) {
    this.filters.keyLevel = event.target.value ? +event.target.value : undefined;
    this.filterChange.emit(this.filters);
  }
}
