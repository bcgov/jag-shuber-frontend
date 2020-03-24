import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    AlternateAssignment, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';

class AlternateAssignmentTypeMapRequest
    extends GetEntityMapRequest<void, AlternateAssignment, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'alternateAssignmentMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let alternateAssignmentTypes = await api.getAlternateAssignmentTypes();
        return arrayToMap(alternateAssignmentTypes, a => a.id);
    }
}

export const alternateAssignmentTypeMapRequest = new AlternateAssignmentTypeMapRequest();

class CreateOrUpdateAlternateAssignmentTypesRequest extends CreateOrUpdateEntitiesRequest<AlternateAssignment, AssignmentModuleState>{
    createEntity(entity: Partial<AlternateAssignment>, { api }: ThunkExtra): Promise<AlternateAssignment> {
        return api.createAlternateAssignmentType(entity);
    }

    updateEntity(entity: AlternateAssignment, { api }: ThunkExtra): Promise<AlternateAssignment> {
        return api.updateAlternateAssignmentType(entity);
    }

    constructor(config?: RequestConfig<AlternateAssignment[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateAlternateAssignmentTypes',
                toasts: {
                    success: (s) => `Created/updated other assignment types`,
                    error: (err: any) => `Couldn't create/update other assignment types: ${err.message}`
                },
                ...config
            },
            alternateAssignmentTypeMapRequest
        );
    }
}

export const createOrUpdateAlternateAssignmentTypesRequest = new CreateOrUpdateAlternateAssignmentTypesRequest();

class ExpireAlternateAssignmentTypesRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireAlternateAssignmentTypes',
            toasts: {
                success: (ids) => `${ids.length} other assignment type(s) expired`,
                error: (err) => `Problem encountered while expiring other assignment types: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireAlternateAssignmentTypes(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, otherAssignmentTypeIds: IdType[]) {
        const newMap = { ...alternateAssignmentTypeMapRequest.getRequestData(moduleState) };
        otherAssignmentTypeIds.forEach(id => delete newMap[id]);
        return alternateAssignmentTypeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireAlternateAssignmentTypesRequest = new ExpireAlternateAssignmentTypesRequest();

class DeleteAlternateAssignmentTypesRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteAlternateAssignmentTypes',
            toasts: {
                success: (ids) => `${ids.length} other assignment type(s) deleted`,
                error: (err) => `Problem encountered while deleting other assignment types: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteAlternateAssignmentTypes(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, otherAssignmentTypeIds: IdType[]) {
        const newMap = { ...alternateAssignmentTypeMapRequest.getRequestData(moduleState) };
        otherAssignmentTypeIds.forEach(id => delete newMap[id]);
        return alternateAssignmentTypeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteAlternateAssignmentTypesRequest = new DeleteAlternateAssignmentTypesRequest();
