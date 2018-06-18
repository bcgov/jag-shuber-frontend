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

// Sheriff Map
class SheriffMapRequest extends GetEntityMapRequest<void, Sheriff, SheriffModuleState> {
    constructor() {
        super({namespace:STATE_KEY,actionName: 'sheriffMap'});
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
        super({namespace:STATE_KEY,actionName: 'createSheriff'}, sheriffMapRequest);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.createSheriff(sheriff as Sheriff);
        return newSheriff;
    }
}

export const createSheriffRequest = new CreateSheriffRequest();

// Sheriff Edit
class UpdateSheriffRequest extends UpdateEntityRequest<Sheriff, SheriffModuleState> {
    constructor() {
        super({namespace:STATE_KEY,actionName: 'updateSheriff'}, sheriffMapRequest);
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.updateSheriff(sheriff);
        return newSheriff;
    }
}

export const updateSheriffRequest = new UpdateSheriffRequest();