import { Component } from '@angular/core';
import {
  MachineStatus,
  RunningAndIdleTimes,
} from './machines/machine.interface';
import { Observable } from 'rxjs';
import { MachineService } from './machines/machine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public MachineStatus: typeof MachineStatus = MachineStatus;

  public totalOnOffTime$: Observable<RunningAndIdleTimes> = this.machineService
    .totalOnOffTime$;

  constructor(private machineService: MachineService) {}
}
