import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    GenderCodeMap, 
    CourthouseMap
} from '../../api/Api';

export interface SystemModuleState {
    // Gender Codes
    genderCodeMap?: RequestActionState<GenderCodeMap>;

    // Courthouses
    courthouseMap?: RequestActionState<CourthouseMap>;
}

export const STATE_KEY: string = 'system';