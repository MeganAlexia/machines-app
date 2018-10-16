import { machinesAdapter, MachinesState } from './machines.reducer';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { getRouterState } from '../shared/states/router/router.selectors';
import { selectMachinesStatusesEntities } from './machines-statuses.selectors';
import { MachineResolved, Machine, MachineStatus } from './machine.interface';
import { Dictionary } from '@ngrx/entity';
import { MachineStatusAndTime } from './machine-status.interface';

export const selectMachinesState = createFeatureSelector<MachinesState>(
  'machines'
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = machinesAdapter.getSelectors();

export const selectMachinesIds: MemoizedSelector<
  object,
  string[]
> = createSelector(selectMachinesState, selectIds as any);

export const selectMachinesEntities: MemoizedSelector<
  object,
  Dictionary<Machine>
> = createSelector(selectMachinesState, selectEntities);

export const selectAllMachines: MemoizedSelector<
  object,
  Machine[]
> = createSelector(selectMachinesState, selectAll);

export const selectMachinesTotal: MemoizedSelector<
  object,
  number
> = createSelector(selectMachinesState, selectTotal);

export const selectAllMachinesResolved: MemoizedSelector<
  object,
  MachineResolved[]
> = createSelector(
  selectAllMachines,
  selectMachinesStatusesEntities,
  (machines, machinesStatusesEntities) =>
    machines.map(machine => {
      const statuses: MachineStatusAndTime[] =
        machinesStatusesEntities[machine.id];

      return {
        ...machine,
        status: statuses[statuses.length - 1].status,
        statuses,
      };
    })
);

export const selectMachineIdFromUrl: MemoizedSelector<
  object,
  string
> = createSelector(getRouterState, routerState => {
  if (
    routerState.state &&
    routerState.state.root &&
    routerState.state.root.children[0] &&
    routerState.state.root.children[0].params
  ) {
    return routerState.state.root.children[0].params.id;
  }
});

export const selectMachineResolvedFromUrl: MemoizedSelector<
  object,
  MachineResolved
> = createSelector(
  selectMachineIdFromUrl,
  selectMachinesEntities,
  selectMachinesStatusesEntities,
  (machineId, machinesEntities, machinesStatusesEntities) => {
    if (!machinesEntities[machineId]) {
      return;
    }

    const statuses: MachineStatusAndTime[] =
      machinesStatusesEntities[machineId];

    return {
      ...machinesEntities[machineId],
      status: statuses[statuses.length - 1].status,
      statuses,
    };
  }
);
