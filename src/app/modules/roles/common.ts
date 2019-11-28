import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Role,
    MapType
} from '../../api/Api';

export interface RoleModuleState {
    roleMap?: RequestActionState<MapType<Role>>;
}

export const STATE_KEY: string = 'roles';
