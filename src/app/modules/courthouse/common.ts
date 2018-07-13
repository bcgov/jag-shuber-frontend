import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
   RunMap,
   SheriffRankCodeMap
} from '../../api/Api';

export interface CourthouseModuleState {    
    // Runs
    runMap?: RequestActionState<RunMap>;
    
    // Sheriff Rank Codes
    sheriffRankCodeMap?: RequestActionState<SheriffRankCodeMap>;

}
export const STATE_KEY: string = 'courthouse';