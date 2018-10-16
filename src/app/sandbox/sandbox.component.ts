import { Component, OnInit } from '@angular/core';
import {
  MachineStatusFromWebSocket,
  Machine,
} from '../machines/machine.interface';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { MachineService } from '../machines/machine.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  public machine$: Observable<Machine>;

  public machinesStatusesChanges$: Observable<
    MachineStatusFromWebSocket[]
  > = this.machineService.machineStatusChanges$.pipe(
    scan<MachineStatusFromWebSocket>((statuses, status) => {
      statuses.push(status);
      return statuses;
    }, [])
  );

  constructor(private machineService: MachineService) {}

  ngOnInit() {}

  fetchExampleMachine(): void {
    this.machine$ = this.machineService.getMachineById(`machine-0`);
  }
}
