import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Sheriff,
    SheriffMap,
    SheriffProfile,
    SheriffRankCodeMap
} from '../../api/Api';

export type ErrorMap = { [key: string]: Error | string };

export interface SheriffModuleState {
    sheriffMap?: RequestActionState<SheriffMap>;
    sheriffRankCodeMap?: RequestActionState<SheriffRankCodeMap>;
    createSheriff?: RequestActionState<Sheriff>;
    updateSheriff?: RequestActionState<Sheriff>;
    createSheriffProfile?: RequestActionState<SheriffProfile>;
    updateSheriffProfile?: RequestActionState<SheriffProfile>;
    selectedSection?: string;
    pluginSubmitErrors?: ErrorMap;
}

export const STATE_KEY: string = 'sheriffs';
