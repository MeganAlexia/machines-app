import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, combineLatest } from 'rxjs';
import {
  Machine,
  RunningAndIdleTimes,
  MachineStatus,
  MachineStatusFromWebSocket,
} from './machine.interface';
import { uuid } from '../shared/interfaces/uuid.interface';
import { delay, filter, switchMap, mapTo, map, share } from 'rxjs/operators';
import { State } from '../state';
import { Store, select } from '@ngrx/store';
import { selectMachinesStatusesEntities } from './machines-statuses.selectors';
import { MachineStatusAndTime } from './machine-status.interface';
import { selectMachinesIds } from './machines.selectors';
import { Dictionary } from '@ngrx/entity';
import { Socket } from 'ng-socket-io';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private machineIds$ = this.store.pipe(select(selectMachinesIds));
  private machinesStatuses$ = this.store.pipe(
    select(selectMachinesStatusesEntities),
    filter(x => Object.keys(x).length > 0)
  );
  private updateRateMs = 50;
  public readonly machineStatusChanges$ = this.socket.fromEvent<
    MachineStatusFromWebSocket
  >('MACHINE_STATUS_CHANGES');

  constructor(
    private http: HttpClient,
    private socket: Socket,
    private store: Store<State>
  ) {}

  public totalOnOffTime$: Observable<RunningAndIdleTimes> = combineLatest(
    this.machineIds$,
    this.machinesStatuses$
  ).pipe(
    switchMap(([machinesIdsTmp, machinesStatusesEntitiesTmp]) => {
      return timer(0, this.updateRateMs).pipe(
        mapTo<any, [string[], Dictionary<MachineStatusAndTime[]>]>([
          machinesIdsTmp,
          machinesStatusesEntitiesTmp,
        ]),
        map(([machinesIds, machinesStatusesEntities]) =>
          machinesIds.reduce<RunningAndIdleTimes>(
            (statusesAndTime, machineId) => {
              const statusesUpdated: MachineStatusAndTime[] = getStatusesWithCurrentTime(
                machinesStatusesEntities,
                machineId
              );

              const {
                runningTimeSeconds,
                idleTimeSeconds,
              } = getRunningAndIdleTimesInSeconds(statusesUpdated);

              statusesAndTime.runningTimeSeconds += runningTimeSeconds;
              statusesAndTime.idleTimeSeconds += idleTimeSeconds;

              return statusesAndTime;
            },
            {
              runningTimeSeconds: 0,
              idleTimeSeconds: 0,
            }
          )
        )
      );
    }),
    share()
  );

  public getMachineById(id: uuid): Observable<Machine> {
    return this.http.get<Machine>(
      `http://localhost:3000/machines/${id}?fullMachine=true`);
  }
}

function getStatusesWithCurrentTime(
  machinesStatusesEntities: Dictionary<MachineStatusAndTime[]>,
  machineId: string
) {
  const statuses: MachineStatusAndTime[] = machinesStatusesEntities[machineId];
  const latestStatus = statuses[statuses.length - 1];
  const statusesUpdated = [
    ...statuses,
    // add another status for the same machine with the current time as timestamp
    // this way, every seconds we'll update that latest status and get an update on the time
    // without manipulating the store
    {
      ...latestStatus,
      status:
        latestStatus.status === MachineStatus.ON
          ? MachineStatus.OFF
          : MachineStatus.ON,
      timestamp: new Date().getTime(),
    },
  ];
  return statusesUpdated;
}

export function getRunningAndIdleTimesInSeconds(
  statuses: MachineStatusAndTime[]
): RunningAndIdleTimes {
  return statuses.reduce<
    RunningAndIdleTimes & {
      previous: MachineStatusAndTime;
    }
  >(
    (acc, curr) => {
      if (!acc.previous) {
        acc.previous = curr;
        return acc;
      }

      const deltaSeconds: number =
        (curr.timestamp - acc.previous.timestamp) / 1000;

      // if the machine is now on, means that the time
      // before that should be added to IDLE time
      if (curr.status === MachineStatus.ON) {
        acc.idleTimeSeconds += deltaSeconds;
      } else {
        acc.runningTimeSeconds += deltaSeconds;
      }

      acc.previous = curr;
      return acc;
    },
    { runningTimeSeconds: 0, idleTimeSeconds: 0, previous: null }
  );
}
