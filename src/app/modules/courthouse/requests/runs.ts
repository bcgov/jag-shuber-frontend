import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    Run
} from '../../../api/index';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class RunMapRequest extends GetEntityMapRequest<void, Run, CourthouseModuleState> {
    constructor() {
        super(STATE_KEY, 'runMap');
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let runs = await api.getRuns();
        return arrayToMap(runs, r => r.id);
    }
}

export const runMapRequest = new RunMapRequest();