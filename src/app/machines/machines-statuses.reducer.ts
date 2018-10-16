import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MachineStatusAndTime } from './machine-status.interface';
import {
  MachinesStatusesActionsUnion,
  ADD_STATUS,
} from './machines-statuses.actions';
import { MachinesActionsUnion } from './machines.actions';

export type MachinesStatusesState = EntityState<MachineStatusAndTime[]>;

export const machinesStatusesAdapter: EntityAdapter<
  MachineStatusAndTime[]
> = createEntityAdapter<MachineStatusAndTime[]>();

export const initialState: MachinesStatusesState = machinesStatusesAdapter.getInitialState();

export function machinesStatusesReducer(
  state = initialState,
  action: MachinesActionsUnion | MachinesStatusesActionsUnion
): MachinesStatusesState {
  switch (action.type) {
    case ADD_STATUS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.machineId]: [
            ...(state.entities[action.payload.machineId] || []),
            action.payload,
          ],
        },
        ids: [...state.ids as string[], action.payload.machineId],
      };

    default:
      return state;
  }
}
