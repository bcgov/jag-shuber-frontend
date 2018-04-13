import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    CourtroomMap
} from '../../../api/index';

class CourtroomMapRequest extends RequestAction<void, CourtroomMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'courtroomMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<CourtroomMap> {
        let courtrooms = await api.getCourtrooms();
        return arrayToMap(courtrooms, c => c.id);
    }
}

export const courtroomMapRequest = new CourtroomMapRequest();