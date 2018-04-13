import RequestAction from '../../infrastructure/RequestAction';
import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SheriffModuleState
} from './common';
import {
    SheriffMap,
    Sheriff
} from '../../api/index';

// Sheriff Map
class SheriffMapRequest extends RequestAction<void, SheriffMap, SheriffModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'sheriffMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<SheriffMap> {
        let sheriffs = await api.getSheriffs();
        return arrayToMap(sheriffs, t => t.id);
    }
}

export const sheriffMapRequest = new SheriffMapRequest();

// Create Sheriff
class CreateSheriffRequest extends RequestAction<Partial<Sheriff>, Sheriff, SheriffModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'createSheriff') {
        super(namespace, actionName);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.createSheriff(sheriff as Sheriff);
        return newSheriff;
    }

    reduceSuccess(moduleState: SheriffModuleState, action: { type: string, payload: Sheriff }): SheriffModuleState {
        // Call the super's reduce success and pull out our state and
        // the sheriffMap state
        const {
            sheriffMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our sheriff to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<SheriffModuleState> = {
            ...restState,
            sheriffMap: {
                ...restMap,
                data: newMap
            }
        }
        return newState;
    }
}

export const createSheriffRequest = new CreateSheriffRequest();

// Sheriff Edit
class UpdateSheriffRequest extends CreateSheriffRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateSheriff') {
        super(namespace, actionName);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.updateSheriff(sheriff);
        return newSheriff;
    }
    
    reduceSuccess(moduleState: SheriffModuleState, action: { type: string, payload: Sheriff }): SheriffModuleState {
        // Call the super's reduce success and pull out our state and
        // the sheriffMap state
        const {
            sheriffMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our sheriff to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<SheriffModuleState> = {
            ...restState,
            sheriffMap: {
                ...restMap,
                data: newMap
            }
        }
        return newState;
    }
}

export const updateSheriffRequest = new UpdateSheriffRequest();