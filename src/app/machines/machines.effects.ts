import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { of, concat } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { State } from '../state';
import { AddMachine } from './machines.actions';
import { MachineService } from './machine.service';
import { AddStatus } from './machines-statuses.actions';
import { selectMachinesStatusesEntities } from './machines-statuses.selectors';

@Injectable()
export class MachinesEffects {
  @Effect()
  wsMachineStatusChanges$ = this.machineService.machineStatusChanges$.pipe(
    withLatestFrom(this.store.pipe(select(selectMachinesStatusesEntities))),
    mergeMap(([statusChangedOnMachine, machinesStatusesEntities]) => {
      const addStatusAction = new AddStatus({
        machineId: statusChangedOnMachine.id,
        status: statusChangedOnMachine.status,
        timestamp: new Date().getTime(),
      });

      if (machinesStatusesEntities[statusChangedOnMachine.id]) {
        return of(addStatusAction);
      }

      return concat(
        of(addStatusAction),
        this.machineService
          .getMachineById(addStatusAction.payload.machineId)
          .pipe(map(machine => new AddMachine(machine)))
      );
    })
  );

  constructor(
    private store: Store<State>,
    private machineService: MachineService
  ) {}
}
