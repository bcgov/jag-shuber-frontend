import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    AlternateAssignmentMap
} from '../../../api/index';

class AlternateAssignmentTypeMapRequest extends RequestAction<void, AlternateAssignmentMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'alternateAssignmentMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AlternateAssignmentMap> {
        let alternateAssignmentTypes = await api.getAlternateAssignmentTypes();
        return arrayToMap(alternateAssignmentTypes, a => a.id);
    }
}

export const alternateAssignmentTypeMapRequest = new AlternateAssignmentTypeMapRequest();