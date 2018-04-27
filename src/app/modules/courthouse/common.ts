import { RequestActionState } from '../../infrastructure/RequestAction';
import {
   CourtroomMap,
   RunMap,
   JailRoleMap,
   AlternateAssignmentMap,
   CourthouseMap
} from '../../api/Api';

export interface CourthouseModuleState {
    // Courtrooms
    courtroomMap?: RequestActionState<CourtroomMap>;
    
    // Runs
    runMap?: RequestActionState<RunMap>;

    // Jail Roles
    jailRoleMap?: RequestActionState<JailRoleMap>;

    // Alternate Assignment Types
    alternateAssignmentMap?: RequestActionState<AlternateAssignmentMap>;

    // Courthouses
    courthouseMap?: RequestActionState<CourthouseMap>;
}
export const STATE_KEY: string = 'courthouse';