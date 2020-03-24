import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    EscortRun, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';

class RunMapRequest extends GetEntityMapRequest<void, EscortRun, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'runMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let runs = await api.getEscortRuns();
        return arrayToMap(runs, r => r.id);
    }
}

export const runMapRequest = new RunMapRequest();

class CreateOrUpdateEscortRunsRequest extends CreateOrUpdateEntitiesRequest<EscortRun, AssignmentModuleState>{
    createEntity(entity: Partial<EscortRun>, { api }: ThunkExtra): Promise<EscortRun> {
        return api.createEscortRun(entity);
    }

    updateEntity(entity: EscortRun, { api }: ThunkExtra): Promise<EscortRun> {
        return api.updateEscortRun(entity);
    }

    constructor(config?: RequestConfig<EscortRun[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateEscortRuns',
                toasts: {
                    success: (s) => `Created/updated escort run types`,
                    error: (err: any) => `Couldn't create/update escort run types: ${err.message}`
                },
                ...config
            },
            runMapRequest
        );
    }
}

export const createOrUpdateEscortRunsRequest = new CreateOrUpdateEscortRunsRequest();

class ExpireEscortRunsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireEscortRuns',
            toasts: {
                success: (ids) => `${ids.length} escort run type(s) expired`,
                error: (err) => `Problem encountered while expiring escort run types: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireEscortRuns(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, escortRunIds: IdType[]) {
        const newMap = { ...runMapRequest.getRequestData(moduleState) };
        escortRunIds.forEach(id => delete newMap[id]);
        return runMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireEscortRunsRequest = new ExpireEscortRunsRequest();

class DeleteEscortRunsRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteEscortRuns',
            toasts: {
                success: (ids) => `${ids.length} escort run type(s) deleted`,
                error: (err) => `Problem encountered while deleting escort run types: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteEscortRuns(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, escortRunIds: IdType[]) {
        const newMap = { ...runMapRequest.getRequestData(moduleState) };
        escortRunIds.forEach(id => delete newMap[id]);
        return runMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteEscortRunsRequest = new DeleteEscortRunsRequest();
