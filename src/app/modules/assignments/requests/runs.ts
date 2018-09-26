import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    EscortRun
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class RunMapRequest extends GetEntityMapRequest<void, EscortRun, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'runMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let runs = await api.getEscortRuns();
        return arrayToMap(runs, r => r.id);
    }
}

export const runMapRequest = new RunMapRequest();