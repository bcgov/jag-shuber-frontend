import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as roleRequests from './requests/roles';
import * as apiScopeRequests from './requests/apiScopes';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';

import {
    RoleMap,
    IdType,
    LEAVE_CODE_PERSONAL,
    // LEAVE_CODE_TRAINING, // TODO: Remove this
    // DateType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
// import arrayToMap from '../../infrastructure/arrayToMap';
// import moment from 'moment';
// import { CodeSelector } from '../../infrastructure/CodeSelector';

export const getRoles = createSelector(
    roleRequests.roleMapRequest.getData,
    (map) => {
        const roleMap = mapToArray(map);
            // TODO: Roles aren't filtered by date...
            // .filter(l => moment(l.startDate).isSameOrAfter(moment().subtract(1, 'year'), 'day'));
        return roleMap;
            // .sort((a, b) => `${moment(a.startDate).toISOString()}`
            // .localeCompare(`${moment(b.startDate).toISOString()}`));
    }
);

export const getAllRoles = (state: RootState) => {
    if (state) {
        return getRoles(state);
        // return getRoles(state).filter(l => l.roleCode === LEAVE_CODE_PERSONAL);
    }
    return undefined;
};

export const getRole = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: RoleMap = roleRequests.roleMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};

export const getSheriffRoles = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getRoles(state); // .filter(l => l.sheriffId === sheriffId);
    }
    return [];
};

/*export const getPartialDayRoles = (state: RootState) => {
    if (state != null) {
        return getRoles(state).filter(l => l.isPartial);
    }
    return [];
};

export const getFullDayRoles = (state: RootState) => {
    if (state != null) {
        return getRoles(state).filter(l => !l.isPartial);
    }
    return [];
};*/

// Role Sub Codes
export const getRolesCodeMap = () => { return []; }
/* export const getRolesCodeMap = createSelector(
    // TODO: Fix me!!!
    roleRequests.roleTypeMapRequest.getData,
    (roleTypes) => {
        const allCodes = roleTypes[LEAVE_CODE_PERSONAL].concat(roleTypes[LEAVE_CODE_TRAINING]);
        return arrayToMap(allCodes, lt => lt.subCode);
    }
);*/

export const getAllPersonalRoleCodes = () => { return []; }
/* export const getAllPersonalRoleCodes = createSelector(
    // TODO: Fix me!!!
    roleRequests.roleTypeMapRequest.getData,
    (roleTypes) => {
        return roleTypes[LEAVE_CODE_PERSONAL].sort((a, b) => `${a.description}`
            .localeCompare(`${b.description}`)) || [];
    }
); */
