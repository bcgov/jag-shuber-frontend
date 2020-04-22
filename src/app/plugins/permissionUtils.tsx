// TODO: Doc this!
import { User } from '../api';

export const buildPluginPermissions = (getPluginPermissions: Function | undefined) => {
    let grantAll = false;
    const permissions = (getPluginPermissions)
        ? getPluginPermissions() || []
        : [];

    grantAll = permissions === true;

    return { grantAll, permissions };
};

export const userCan = (permissions: boolean | string[] = [], permissionName: string): boolean => {
    return (typeof permissions === 'boolean')
        ? permissions : permissions instanceof Array
        ? permissions.indexOf(permissionName) > -1 : false;
}

export const userHasBasicAuth = (currentUserRoleScopes = { appScopes: {}, authScopes: [] }): boolean => {
    let userHasAuthScopes = false;
    let userHasAppScopes = false;

    if (currentUserRoleScopes.authScopes) {
        const userAuthScopes = (currentUserRoleScopes.authScopes || [])
            .filter((key: string, idx: number, arr: any[]) => {
                if (key === 'default') return false; // Ignore default OAuth role
                return arr.indexOf(key) === idx;
            });

        if (userAuthScopes.length > 0) {
            userHasAuthScopes = true;
        }
    }

    if (currentUserRoleScopes.appScopes) {
        const userAppScopes = (Object.keys(currentUserRoleScopes.appScopes) || [])
            .filter((key, idx, arr) => {
                return arr.indexOf(key) === idx;
            });

        if (userAppScopes.length > 0) {
            userHasAppScopes = true;
        }
    }

    return (userHasAuthScopes || userHasAppScopes);
}
