import { Component } from '@angular/core';
import { State } from '../state';
import { Store, select } from '@ngrx/store';
import { selectAllMachinesResolved } from './machines.selectors';
import { Observable } from 'rxjs';
import { MachineStatus, MachineResolved } from './machine.interface';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss'],
})
export class MachinesComponent {
  public machines$: Observable<MachineResolved[]> = this.store.pipe(
    select(selectAllMachinesResolved)
  );

  public MachineStatus: typeof MachineStatus = MachineStatus;

  constructor(private store: Store<State>) {}

  public trackById(index: number, item: MachineResolved) {
    return item.id;
  }
}
