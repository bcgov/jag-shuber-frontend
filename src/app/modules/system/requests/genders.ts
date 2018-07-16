import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SystemModuleState
} from '../common';
import {
    GenderCode
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class GenderCodeMapRequest extends GetEntityMapRequest<void, GenderCode, SystemModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'genderCodeMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let genders = await api.getGenderCodes();
        return arrayToMap(genders, g => g.code);
    }
}

export const genderCodeMapRequest = new GenderCodeMapRequest();