import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Sheriff,
    SheriffMap,
    SheriffProfile
} from '../../api/Api';

export interface SheriffModuleState {
    sheriffMap?: RequestActionState<SheriffMap>;
    createSheriff?: RequestActionState<Sheriff>;
    updateSheriff?: RequestActionState<Sheriff>;
    createSheriffProfile?: RequestActionState<SheriffProfile>;
}

export const STATE_KEY: string = 'sheriffs';