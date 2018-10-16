import { uuid } from '../shared/interfaces/uuid.interface';
import { MachineStatusAndTime } from './machine-status.interface';

export enum MachineStatus {
  ON = 'on',
  OFF = 'off',
}

export interface Machine {
  id: uuid;
  name: string;
}

export interface RunningAndIdleTimes {
  runningTimeSeconds: number;
  idleTimeSeconds: number;
}

export interface MachineResolved extends Machine {
  status: MachineStatus;
  statuses: MachineStatusAndTime[];
}

export interface MachineStatusFromWebSocket {
  id: uuid;
  status: MachineStatus;
}
