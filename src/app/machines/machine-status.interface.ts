import { MachineStatus } from './machine.interface';

export interface MachineStatusAndTime {
  machineId: string;
  status: MachineStatus;
  timestamp: number;
}
