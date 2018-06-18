import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    JailRole
} from '../../../api/index';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

class JailRoleMapRequest extends GetEntityMapRequest<void, JailRole, CourthouseModuleState> {
    constructor() {
        super({namespace:STATE_KEY,actionName: 'jailRoleMap'});
    }
    public async doWork(request: void, { api }: ThunkExtra){
        let jailRoles = await api.getJailRoles();
        return arrayToMap(jailRoles, j => j.code);
    }
}

export const jailRoleMapRequest = new JailRoleMapRequest();