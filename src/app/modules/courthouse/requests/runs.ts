import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    RunMap
} from '../../../api/index';

class RunMapRequest extends RequestAction<void, RunMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'runMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<RunMap> {
        let runs = await api.getRuns();
        return arrayToMap(runs, r => r.id);
    }
}

export const runMapRequest = new RunMapRequest();