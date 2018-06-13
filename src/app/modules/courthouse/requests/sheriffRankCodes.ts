import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    SheriffRank
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class SheriffRankCodeMapRequest extends GetEntityMapRequest<void, SheriffRank, CourthouseModuleState> {
    constructor() {
        super(STATE_KEY, 'sheriffRankCodeMap');
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let rankCodes = await api.getSheriffRankCodes();
        return arrayToMap(rankCodes, r => r.code);
    }
}

export const sheriffRankCodeMapRequest = new SheriffRankCodeMapRequest();