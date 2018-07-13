import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    AlternateAssignment
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class AlternateAssignmentTypeMapRequest
    extends GetEntityMapRequest<void, AlternateAssignment, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'alternateAssignmentMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let alternateAssignmentTypes = await api.getAlternateAssignmentTypes();
        return arrayToMap(alternateAssignmentTypes, a => a.code);
    }
}

export const alternateAssignmentTypeMapRequest = new AlternateAssignmentTypeMapRequest();