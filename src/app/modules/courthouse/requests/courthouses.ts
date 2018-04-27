import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    CourthouseMap
} from '../../../api/Api';

class CourthouseMapRequest extends RequestAction<void, CourthouseMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'courthouseMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<CourthouseMap> {
        let courthouses = await api.getCourthouses();
        return arrayToMap(courthouses, c => c.id);
    }
}

export const courthouseMapRequest = new CourthouseMapRequest();