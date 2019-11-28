import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as roleRequests from './requests';
import {
    RoleMap,
    IdType,
    LEAVE_CODE_PERSONAL,
    LEAVE_CODE_TRAINING,
    // DateType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import arrayToMap from '../../infrastructure/arrayToMap';
import moment from 'moment';
// import { CodeSelector } from '../../infrastructure/CodeSelector';

export const allRoles = createSelector(
    roleRequests.roleMapRequest.getData,
    (map) => {
        const roleMap = mapToArray(map)
            .filter(l => moment(l.startDate).isSameOrAfter(moment().subtract(1, 'year'), 'day'));
        return roleMap
            .sort((a, b) => `${moment(a.startDate).toISOString()}`
            .localeCompare(`${moment(b.startDate).toISOString()}`));
    }
);

export const getAllPersonaRoles = (state: RootState) => {
    if (state) {
        return allRoles(state).filter(l => l.roleCode === LEAVE_CODE_PERSONAL);
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
        return allRoles(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};

/*export const getPartialDayRoles = (state: RootState) => {
    if (state != null) {
        return allRoles(state).filter(l => l.isPartial);
    }
    return [];
};

export const getFullDayRoles = (state: RootState) => {
    if (state != null) {
        return allRoles(state).filter(l => !l.isPartial);
    }
    return [];
};*/

// Role Sub Codes
export const allRolesCodeMap = createSelector(
    roleRequests.roleTypeMapRequest.getData,
    (roleTypes) => {
        const allCodes = roleTypes[LEAVE_CODE_PERSONAL].concat(roleTypes[LEAVE_CODE_TRAINING]);
        return arrayToMap(allCodes, lt => lt.subCode);
    }
);

export const getAllPersonalRoleCodes = createSelector(
    roleRequests.roleTypeMapRequest.getData,
    (roleTypes) => {
        return roleTypes[LEAVE_CODE_PERSONAL].sort((a, b) => `${a.description}`
            .localeCompare(`${b.description}`)) || [];
    }
);
