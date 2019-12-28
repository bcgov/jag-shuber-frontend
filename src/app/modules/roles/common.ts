import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Role,
    RolePermission,
    RoleFrontendScope,
    RoleApiScope,
    FrontendScope,
    FrontendScopePermission,
    ApiScope,
    UserRole,
    MapType
} from '../../api/Api';

export type ErrorMap = { [key: string]: Error | string };

export interface RoleModuleState {
    roleMap?: RequestActionState<MapType<Role>>;
    rolePermissionMap?: RequestActionState<MapType<RolePermission>>;
    roleFrontendScopeMap?: RequestActionState<MapType<RoleFrontendScope>>;
    roleApiScopeMap?: RequestActionState<MapType<RoleApiScope>>;
    frontendScopeMap?: RequestActionState<MapType<FrontendScope>>;
    frontendScopePermissionMap?: RequestActionState<MapType<FrontendScopePermission>>;
    apiScopeMap?: RequestActionState<MapType<ApiScope>>;
    userRoleMap?: RequestActionState<MapType<UserRole>>;
    selectedProfileSection?: string;
    pluginSubmitErrors?: ErrorMap;
    pluginFilters?: {}; // TODO: We could type this a bit better...
}

export const STATE_KEY: string = 'roles';
