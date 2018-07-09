import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    Courtroom
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class CourtroomMapRequest extends GetEntityMapRequest<void, Courtroom, CourthouseModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'courtroomMap' });
    }

    public async doWork(request: void, { api }: ThunkExtra) {
        let courtrooms = await api.getCourtrooms();
        return arrayToMap(courtrooms, c => c.id);
    }
}

export const courtroomMapRequest = new CourtroomMapRequest();