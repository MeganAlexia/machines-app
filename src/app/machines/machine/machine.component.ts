import { Component, OnInit } from '@angular/core';
import { State } from '../../state';
import { Store, select } from '@ngrx/store';
import { selectMachineResolvedFromUrl } from '../machines.selectors';
import { Observable } from 'rxjs';
import { MachineResolved, MachineStatus } from '../machine.interface';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
})
export class MachineComponent implements OnInit {
  public machine$: Observable<MachineResolved> = this.store.pipe(
    select(selectMachineResolvedFromUrl)
  );

  public MachineStatus: typeof MachineStatus = MachineStatus;

  constructor(private store: Store<State>) {}

  ngOnInit() {}
}
