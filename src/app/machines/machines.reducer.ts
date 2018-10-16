import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Machine } from './machine.interface';
import { ADD_MACHINE, MachinesActionsUnion } from './machines.actions';

export type MachinesState = EntityState<Machine>;

export const machinesAdapter: EntityAdapter<Machine> = createEntityAdapter<
  Machine
>();

export const initialState: MachinesState = machinesAdapter.getInitialState();

export function machinesReducer(
  state = initialState,
  action: MachinesActionsUnion
): MachinesState {
  switch (action.type) {
    case ADD_MACHINE:
      return machinesAdapter.addOne(action.payload, state);

    default:
      return state;
  }
}
