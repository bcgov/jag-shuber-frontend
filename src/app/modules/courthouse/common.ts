import { RequestActionState } from '../../infrastructure/RequestAction';
import {
   CourtroomMap,
   RunMap,
   JailRoleMap,
   AlternateAssignmentMap
} from '../../api/index';

export interface CourthouseModuleState {
    // Courtrooms
    courtroomMap?: RequestActionState<CourtroomMap>;
    
    // Runs
    runMap?: RequestActionState<RunMap>;

    // Jail Roles
    jailRoleMap?: RequestActionState<JailRoleMap>;

    // Alternate Assignment Types
    alternateAssignmentMap?: RequestActionState<AlternateAssignmentMap>;
}
export const STATE_KEY: string = 'courthouse';