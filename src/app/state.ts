import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { machinesReducer, MachinesState } from './machines/machines.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { machinesStatusesReducer, MachinesStatusesState } from './machines/machines-statuses.reducer';

export interface State {
  router: RouterReducerState;
  machines: MachinesState;
  machinesStatuses: MachinesStatusesState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  machines: machinesReducer,
  machinesStatuses: machinesStatusesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
