import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
   SheriffRankCodeMap
} from '../../api/Api';

export interface CourthouseModuleState {    
    // Sheriff Rank Codes
    sheriffRankCodeMap?: RequestActionState<SheriffRankCodeMap>;

}
export const STATE_KEY: string = 'courthouse';