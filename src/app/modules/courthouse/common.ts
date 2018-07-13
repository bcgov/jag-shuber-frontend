import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
   RunMap,
   JailRoleMap,
   SheriffRankCodeMap
} from '../../api/Api';

export interface CourthouseModuleState {    
    // Runs
    runMap?: RequestActionState<RunMap>;

    // Jail Roles
    jailRoleMap?: RequestActionState<JailRoleMap>;
    
    // Sheriff Rank Codes
    sheriffRankCodeMap?: RequestActionState<SheriffRankCodeMap>;

}
export const STATE_KEY: string = 'courthouse';