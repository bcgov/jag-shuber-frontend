import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    GenderCodeMap
} from '../../api/Api';

export interface SystemModuleState {
    // Gender Codes
    genderCodeMap?: RequestActionState<GenderCodeMap>;
}

export const STATE_KEY: string = 'system';