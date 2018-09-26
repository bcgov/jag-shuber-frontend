import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    GenderCodeMap, 
    LocationMap
} from '../../api/Api';

export interface SystemModuleState {
    // Gender Codes
    genderCodeMap?: RequestActionState<GenderCodeMap>;

    // Locations
    locationMap?: RequestActionState<LocationMap>;
}

export const STATE_KEY: string = 'system';