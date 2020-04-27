import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    SheriffLocation,
    MapType

} from '../../api/Api';

export interface SheriffLocationModuleState {
    sheriffLocationMap?: RequestActionState<MapType<SheriffLocation>>;
}

export const STATE_KEY: string = 'sheriffLocations';