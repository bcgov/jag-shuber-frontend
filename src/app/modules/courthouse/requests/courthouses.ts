import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    Courthouse
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';


class CourthouseMapRequest extends GetEntityMapRequest<void, Courthouse, CourthouseModuleState> {
    constructor() {
        super({namespace:STATE_KEY,actionName: 'courthouseMap'});
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let courthouses = await api.getCourthouses();
        return arrayToMap(courthouses, c => c.id);
    }
}

export const courthouseMapRequest = new CourthouseMapRequest();