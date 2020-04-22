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
                    success: (s) => `Created/updated courtrooms`,
                    error: (err: any) => `Couldn't create/update courtrooms: ${err.message}`
                },
                ...config
            },
            courtroomMapRequest
        );
    }
}

export const createOrUpdateCourtroomsRequest = new CreateOrUpdateCourtroomsRequest();

class ExpireCourtroomsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireCourtrooms',
            toasts: {
                success: (ids) => `${ids.length} courtroom(s) expired`,
                error: (err) => `Problem encountered while expiring courtroom: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireCourtrooms(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, courtroomIds: IdType[]) {
        const newMap = { ...courtroomMapRequest.getRequestData(moduleState) };
        courtroomIds.forEach(id => newMap[id]);
        return courtroomMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireCourtroomsRequest = new ExpireCourtroomsRequest();

class UnexpireCourtroomsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'unexpireCourtrooms',
            toasts: {
                success: (ids) => `${ids.length} courtroom(s) un-expired`,
                error: (err) => `Problem encountered while un-expiring courtroom: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.unexpireCourtrooms(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, courtroomIds: IdType[]) {
        const newMap = { ...courtroomMapRequest.getRequestData(moduleState) };
        courtroomIds.forEach(id => newMap[id]);
        return courtroomMapRequest.setRequestData(moduleState, newMap);
    }
}

export const unexpireCourtroomsRequest = new UnexpireCourtroomsRequest();

class DeleteCourtroomsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteCourtrooms',
            toasts: {
                success: (ids) => `${ids.length} courtroom(s) deleted`,
                error: (err) => `Problem encountered while deleting courtroom: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteCourtrooms(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, courtroomIds: IdType[]) {
        const newMap = { ...courtroomMapRequest.getRequestData(moduleState) };
        courtroomIds.forEach(id => delete newMap[id]);
        return courtroomMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteCourtroomsRequest = new DeleteCourtroomsRequest();
