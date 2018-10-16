import { Action } from '@ngrx/store';
import { Machine } from './machine.interface';

export const ADD_MACHINE = '[Machines] ADD_MACHINE';
export class AddMachine implements Action {
  readonly type = ADD_MACHINE;

  constructor(public payload: Machine) {}
}

export type MachinesActionsUnion = AddMachine;
