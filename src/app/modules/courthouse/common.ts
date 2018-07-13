import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
   CourtroomMap,
   RunMap,
   JailRoleMap,
   AlternateAssignmentMap,
   SheriffRankCodeMap,
   CourtRoleMap
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

    // Sheriff Rank Codes
    sheriffRankCodeMap?: RequestActionState<SheriffRankCodeMap>;

    // Court Roles
    courtRoleMap?: RequestActionState<CourtRoleMap>;
}
export const STATE_KEY: string = 'courthouse';