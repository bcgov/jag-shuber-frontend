import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    CourthouseModuleState
} from '../common';
import {
    JailRoleMap
} from '../../../api/index';

class JailRoleMapRequest extends RequestAction<void, JailRoleMap, CourthouseModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'jailRoleMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<JailRoleMap> {
        let jailRoles = await api.getJailRoles();
        return arrayToMap(jailRoles, j => j.code);
    }
}

export const jailRoleMapRequest = new JailRoleMapRequest();