import { Action } from '@ngrx/store';
import { MachineStatusAndTime } from './machine-status.interface';

export const ADD_STATUS = '[Machines] ADD_STATUS';
export class AddStatus implements Action {
  readonly type = ADD_STATUS;

  constructor(public payload: MachineStatusAndTime) {}
}

export type MachinesStatusesActionsUnion = AddStatus;
