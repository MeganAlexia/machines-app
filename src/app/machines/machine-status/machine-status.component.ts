import { Component, Input } from '@angular/core';
import { MachineStatus } from '../machine.interface';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
})
export class MachineStatusComponent {
  @Input()
  status: MachineStatus;

  public MachineStatus: typeof MachineStatus = MachineStatus;
}
