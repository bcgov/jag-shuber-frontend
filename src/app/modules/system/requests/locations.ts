import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SystemModuleState
} from '../common';
import {
    Location
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class LocationMapRequest extends GetEntityMapRequest<void, Location, SystemModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'locationMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let entities = await api.getLocations();
        return arrayToMap(entities, l => l.id);
    }
}

export const locationMapRequest = new LocationMapRequest();