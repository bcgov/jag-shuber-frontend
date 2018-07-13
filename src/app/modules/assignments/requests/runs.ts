import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    Run
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class RunMapRequest extends GetEntityMapRequest<void, Run, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'runMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let runs = await api.getRuns();
        return arrayToMap(runs, r => r.id);
    }
}

export const runMapRequest = new RunMapRequest();