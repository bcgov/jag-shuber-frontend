import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SheriffLocationModuleState,
} from './common';

import {
    SheriffLocation,
    IdType,
    SheriffLocationMap
} from '../../api/Api';

import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import { RoleModuleState } from '../roles/common';
import { roleMapRequest } from '../roles/requests/roles';

// Get the Map
class SheriffLocationMapRequest extends GetEntityMapRequest<void, SheriffLocation, SheriffLocationModuleState> {
    constructor(config?: RequestConfig<SheriffLocationMap>) {
        super({
            namespace: STATE_KEY,
            actionName: 'sheriffLocationMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<SheriffLocationMap> {
        let sheriffLocations = await api.getSheriffLocations();
        return arrayToMap(sheriffLocations, t => t.id);
    }
}

export const sheriffLocationMapRequest = new SheriffLocationMapRequest();

class CreateOrUpdateSheriffLocationRequest extends CreateOrUpdateEntitiesRequest<SheriffLocation, SheriffLocationModuleState>{
    createEntity(entity: Partial<SheriffLocation>, { api }: ThunkExtra): Promise<SheriffLocation> {
        return api.createSheriffLocation(entity);
    }
    updateEntity(entity: Partial<SheriffLocation>, { api }: ThunkExtra): Promise<SheriffLocation> {
        return api.updateSheriffLocation(entity as SheriffLocation);
    }
    constructor(config?: RequestConfig<SheriffLocation[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateSheriffLocation',
                toasts: {
                    success: (s) => `Created/updated SheriffLocation`,
                    error: (err: any) => `Couldn't create/update SheriffLocation: ${err.message}`
                },
                ...config
            },
            sheriffLocationMapRequest
        );
    }
}

export const createOrUpdateSheriffLocationRequest = new CreateOrUpdateSheriffLocationRequest();
