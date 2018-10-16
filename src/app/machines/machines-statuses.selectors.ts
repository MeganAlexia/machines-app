import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  MachinesStatusesState,
  machinesStatusesAdapter,
} from './machines-statuses.reducer';
import { Dictionary } from '@ngrx/entity';
import { MachineStatusAndTime } from './machine-status.interface';

export const selectMachinesStatusesState = createFeatureSelector<
  MachinesStatusesState
>('machinesStatuses');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = machinesStatusesAdapter.getSelectors();

export const selectMachinesStatusesIds: MemoizedSelector<
  object,
  string[]
> = createSelector(selectMachinesStatusesState, selectIds as any);

export const selectMachinesStatusesEntities: MemoizedSelector<
  object,
  Dictionary<MachineStatusAndTime[]>
> = createSelector(selectMachinesStatusesState, selectEntities);

export const selectAllMachinesStatuses: MemoizedSelector<
  object,
  MachineStatusAndTime[][]
> = createSelector(selectMachinesStatusesState, selectAll);

export const selectMachinesStatusesTotal: MemoizedSelector<
  object,
  number
> = createSelector(selectMachinesStatusesState, selectTotal);
