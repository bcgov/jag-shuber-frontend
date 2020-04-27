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

class CreateOrUpdateSheriffLocationsRequest extends CreateOrUpdateEntitiesRequest<SheriffLocation, SheriffLocationModuleState>{
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
                actionName: 'createOrUpdateSheriffLocations',
                toasts: {
                    success: (s) => `Created/updated sheriff location(s)`,
                    error: (err: any) => `Couldn't create/update sheriff location(s): ${err.message}`
                },
                ...config
            },
            sheriffLocationMapRequest
        );
    }
}

export const createOrUpdateSheriffLocationsRequest = new CreateOrUpdateSheriffLocationsRequest();

class ExpireSheriffLocationsRequest extends RequestAction<IdType[], IdType[], SheriffLocationModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireSheriffLocations',
            toasts: {
                success: (ids) => `${ids.length} sheriff location(s) expired`,
                error: (err) => `Problem encountered while expiring sheriff location(s): ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireSheriffLocations(request);
        return request;
    }

    setRequestData(moduleState: SheriffLocationModuleState, sheriffLocationIds: IdType[]) {
        const newMap = { ...sheriffLocationMapRequest.getRequestData(moduleState) };
        sheriffLocationIds.forEach(id => delete newMap[id]);
        return sheriffLocationMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireSheriffLocationsRequest = new ExpireSheriffLocationsRequest();

class UnexpireSheriffLocationsRequest extends RequestAction<IdType[], IdType[], SheriffLocationModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'unexpireSheriffLocations',
            toasts: {
                success: (ids) => `${ids.length} sheriff location(s) un-expired`,
                error: (err) => `Problem encountered while un-expiring sheriff location(s): ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.unexpireSheriffLocations(request);
        return request;
    }

    setRequestData(moduleState: SheriffLocationModuleState, sheriffLocationIds: IdType[]) {
        const newMap = { ...sheriffLocationMapRequest.getRequestData(moduleState) };
        sheriffLocationIds.forEach(id => delete newMap[id]);
        return sheriffLocationMapRequest.setRequestData(moduleState, newMap);
    }
}

export const unexpireSheriffLocationsRequest = new UnexpireSheriffLocationsRequest();

class DeleteSheriffLocationsRequest extends RequestAction<IdType[], IdType[], SheriffLocationModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteSheriffLocations',
            toasts: {
                success: (ids) => `${ids.length} sheriff location(s) deleted`,
                error: (err) => `Problem encountered while deleting sheriff location(s): ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteSheriffLocations(request);
        return request;
    }

    setRequestData(moduleState: SheriffLocationModuleState, sheriffLocationIds: IdType[]) {
        const newMap = { ...sheriffLocationMapRequest.getRequestData(moduleState) };
        sheriffLocationIds.forEach(id => delete newMap[id]);
        return sheriffLocationMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteSheriffLocationsRequest = new DeleteSheriffLocationsRequest();
