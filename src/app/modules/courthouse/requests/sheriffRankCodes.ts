import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    SheriffRankCodeMap
} from '../../../api/Api';

class SheriffRankCodeMapRequest extends RequestAction<void, SheriffRankCodeMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'sheriffRankCodeMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<SheriffRankCodeMap> {
        let rankCodes = await api.getSheriffRankCodes();
        return arrayToMap(rankCodes, r => r.code);
    }
}

export const sheriffRankCodeMapRequest = new SheriffRankCodeMapRequest();