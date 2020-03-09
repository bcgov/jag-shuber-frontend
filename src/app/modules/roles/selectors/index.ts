import { RootState } from '../../../store';

import {
    MapType
} from '../../../api';

import { ErrorMap } from '../../sheriffs/common';

export * from './frontendScopes';
export * from './frontendScopeApis';
export * from './frontendScopePermissions';
export * from './apiScopes';
export * from './roles';
export * from './roleFrontendScopes';
export * from './roleApiScopes';
export * from './rolePermissions';
export * from './userRoles';

// Combiner function to sort an array into a map of keys and filtered values
export const groupByKey = (key: string, arr: any[]): MapType<any> => {
    const map: MapType<any> = {};
    const result = arr.reduce((acc, cur, idx) => {
        if (cur && cur[key]) {
            if (acc[cur[key]] === undefined) {
                acc[cur[key]] = [];
            }

            // @ts-ignore
            if (!(acc[cur[key]].find(i => i === cur))) {
                acc[cur[key]].push(cur);
            }
        }

        return acc;
    }, map);

    return result;
};

export const selectedAdminRolesSection = (state: RootState) => {
    const { roles: { selectedProfileSection = undefined } = {} } = state;
    return selectedProfileSection;
};

export const getAdminRolesPluginErrors = (state: RootState) => {
    const { roles: { pluginSubmitErrors = {} } = {} } = state;
    return pluginSubmitErrors as ErrorMap;
};
