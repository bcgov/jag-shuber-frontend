import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import { RoleModuleState } from '../../roles/common';
import {
    Courtroom, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import { roleMapRequest } from '../../roles/requests/roles';
import { roleFrontendScopeMapRequest } from '../../roles/requests/roleFrontendScopes';

class CourtroomMapRequest extends GetEntityMapRequest<void, Courtroom, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'courtroomMap' });
    }

    public async doWork(request: void, { api }: ThunkExtra) {
        let courtrooms = await api.getCourtrooms();
        return arrayToMap(courtrooms, c => c.id);
    }

    // TODO: Maybe courtrooms and courtRoles should be pulled out into RootState?

}

export const courtroomMapRequest = new CourtroomMapRequest();

class CreateOrUpdateCourtroomsRequest extends CreateOrUpdateEntitiesRequest<Courtroom, AssignmentModuleState>{
    createEntity(entity: Partial<Courtroom>, { api }: ThunkExtra): Promise<Courtroom> {
        return api.createCourtroom(entity);
    }

    updateEntity(entity: Courtroom, { api }: ThunkExtra): Promise<Courtroom> {
        return api.updateCourtroom(entity);
    }

    constructor(config?: RequestConfig<Courtroom[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateCourtrooms',
                toasts: {
                    error: (err: any) => `Couldn't create/update courtrooms: ${err.message}`
                },
                ...config
            },
            courtroomMapRequest
        );
    }
}

export const createOrUpdateCourtroomsRequest = new CreateOrUpdateCourtroomsRequest();

class DeleteCourtroomsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteCourtrooms',
            toasts: {
                success: (ids) => `${ids.length} Courtroom(s) deleted`,
                error: (err) => `Problem encountered while deleting Courtroom: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteCourtrooms(request);
        return request;
    }

    // TODO: How does this all work?
    setRequestData(moduleState: AssignmentModuleState, courtroomIds: IdType[]) {
        const newMap = { ...courtroomMapRequest.getRequestData(moduleState) };
        courtroomIds.forEach(id => delete newMap[id]);
        return courtroomMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteCourtroomsRequest = new DeleteCourtroomsRequest();
