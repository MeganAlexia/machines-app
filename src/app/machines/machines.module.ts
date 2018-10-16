import { NgModule } from '@angular/core';
import { MachinesComponent } from './machines.component';
import { MachineComponent } from './machine/machine.component';
import { MachineService } from './machine.service';
import { SharedModule } from '../shared/modules/shared.module';
import { MachineStatusComponent } from './machine-status/machine-status.component';

@NgModule({
  imports: [SharedModule],
  declarations: [MachinesComponent, MachineComponent, MachineStatusComponent],
  exports: [MachinesComponent, MachineStatusComponent],
  providers: [MachineService],
})
export class MachinesModule {}
