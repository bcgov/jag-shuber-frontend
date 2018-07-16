import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    CourtRole
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class CourtRoleMapRequest extends GetEntityMapRequest<void, CourtRole, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'courtRoleMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let courtRoles = await api.getCourtRoles();
        return arrayToMap(courtRoles, cr => cr.code);
    }
}

export const courtRoleMapRequest = new CourtRoleMapRequest();