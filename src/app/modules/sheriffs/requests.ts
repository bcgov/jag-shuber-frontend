import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SheriffModuleState
} from './common';
import {
    Sheriff
} from '../../api/index';
import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../infrastructure/Requests/UpdateEntityRequest';
import toTitleCase from '../../infrastructure/toTitleCase';
import { SheriffProfile } from '../../api/Api';

// Sheriff Map
class SheriffMapRequest extends GetEntityMapRequest<void, Sheriff, SheriffModuleState> {
    constructor() {
        super({ 
            namespace: STATE_KEY, 
            actionName: 'sheriffMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving list of sheriffs: ${err ? err.toString() : 'Unknown Error'}`
            } 
        });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let sheriffs = await api.getSheriffs();
        return arrayToMap(sheriffs, t => t.id);
    }
}

export const sheriffMapRequest = new SheriffMapRequest();

// Create Sheriff
class CreateSheriffRequest extends CreateEntityRequest<Sheriff, SheriffModuleState> {
    constructor() {
        super({ 
            namespace: STATE_KEY, 
            actionName: 'createSheriff',
            toasts: {
                success: (s) => `${toTitleCase(s.firstName)} ${toTitleCase(s.lastName)} has been added to your team`,
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while adding new sheriff: ${err ? err.toString() : 'Unknown Error'}` 
            }
    }, 
        sheriffMapRequest);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.createSheriff(sheriff as Sheriff);
        return newSheriff;
    }
}

export const createSheriffRequest = new CreateSheriffRequest();

// class CreateSheriffProfileRequest extends RequestAction<Partial<SheriffProfile>, SheriffProfile, SheriffModuleState> {
//     constructor(namespace: string = STATE_KEY, actionName: string = 'createSheriffProfile') {
//         super(namespace, actionName);
//     }
//     public async doWork(sheriffProfile: Partial<SheriffProfile>, { api }: ThunkExtra): Promise<SheriffProfile> {
//         let newSheriffProfile = await api.createSheriffProfile(sheriffProfile as SheriffProfile);
//         return newSheriffProfile;
//     }

//     // tslint:disable-next-line:max-line-length
//     reduceSuccess(moduleState: SheriffModuleState, action: { type: string, payload: SheriffProfile }): SheriffModuleState {
//         // Call the super's reduce success and pull out our state and
//         // the sheriffMap state
//         const {
//             sheriffMap: {
//                 data: currentMap = {},
//                 ...restMap
//             } = {},
//             ...restState
//         } = super.reduceSuccess(moduleState, action);

//         // Create a new map and add our sheriff to it
//         const newMap = { ...currentMap };
//         newMap[action.payload.sheriff.id] = action.payload.sheriff;

//         // Merge the state back together with the original in a new object
//         const newState: Partial<SheriffModuleState> = {
//             ...restState,
//             sheriffMap: {
//                 ...restMap,
//                 data: newMap
//             }
//         };
//         //add leave map stuff!
//         return newState;
//     }
// }

// export const createSheriffProfileRequest = new CreateSheriffProfileRequest();

// Sheriff Edit
class UpdateSheriffRequest extends UpdateEntityRequest<Sheriff, SheriffModuleState> {
    constructor() {
        super({ 
            namespace: STATE_KEY, 
            actionName: 'updateSheriff',
            toasts: {
                success: (s) => `${toTitleCase(s.firstName)} ${toTitleCase(s.lastName)}'s profile has been updated`,
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while updating sheriff profile: ${err ? err.toString() : 'Unknown Error'}` 
            } 
        }, sheriffMapRequest);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.updateSheriff(sheriff);
        return newSheriff;
    }
}

export const updateSheriffRequest = new UpdateSheriffRequest();