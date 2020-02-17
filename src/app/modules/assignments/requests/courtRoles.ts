import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    CourtRoleCode, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';

class CourtRoleMapRequest extends GetEntityMapRequest<void, CourtRoleCode, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'courtRoleMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let courtRoles = await api.getCourtRoles();
        return arrayToMap(courtRoles, cr => cr.id);
    }
}

export const courtRoleMapRequest = new CourtRoleMapRequest();

class CreateOrUpdateCourtRolesRequest extends CreateOrUpdateEntitiesRequest<CourtRoleCode, AssignmentModuleState>{
    createEntity(entity: Partial<CourtRoleCode>, { api }: ThunkExtra): Promise<CourtRoleCode> {
        return api.createCourtRole(entity);
    }

    updateEntity(entity: CourtRoleCode, { api }: ThunkExtra): Promise<CourtRoleCode> {
        return api.updateCourtRole(entity);
    }

    constructor(config?: RequestConfig<CourtRoleCode[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateCourtRoles',
                toasts: {
                    success: (s) => `Created/updated court role`,
                    error: (err: any) => `Couldn't create/update court roles: ${err.message}`
                },
                ...config
            },
            courtRoleMapRequest
        );
    }
}

export const createOrUpdateCourtRolesRequest = new CreateOrUpdateCourtRolesRequest();

class DeleteCourtRolesRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteCourtRoles',
            toasts: {
                success: (ids) => `${ids.length} court role(s) deleted`,
                error: (err) => `Problem encountered while deleting court role: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteCourtRoles(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, courtRoleIds: IdType[]) {
        const newMap = { ...courtRoleMapRequest.getRequestData(moduleState) };
        courtRoleIds.forEach(id => delete newMap[id]);
        return courtRoleMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteCourtRolesRequest = new DeleteCourtRolesRequest();
