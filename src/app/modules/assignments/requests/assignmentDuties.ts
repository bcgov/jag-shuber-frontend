import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    AssignmentDutyMap,
    AssignmentDuty,
    IdType,
    DateRange,
    DateType,
    SheriffDutyReassignmentDetails,
    SheriffDuty,
    MapType
} from '../../../api/Api';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import DeleteEntityRequest from '../../../infrastructure/Requests/DeleteEntityRequest';

// Get the Map
class AssignmentDutyMapRequest extends GetEntityMapRequest<DateRange, AssignmentDuty, AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'assignmentDutyMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving the duty list: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: DateRange = {}, { api }: ThunkExtra): Promise<AssignmentDutyMap> {
        const { startDate, endDate } = request;
        let duties = await api.getAssignmentDuties(startDate, endDate);
        return arrayToMap(duties, t => t.id);
    }
}

export const assignmentDutyMapRequest = new AssignmentDutyMapRequest();

// Assignment Duty Create
class CreateAssignmentDutyRequest extends CreateEntityRequest<AssignmentDuty, AssignmentModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createAssignmentDuty',
                toasts: {
                    success: 'Duty Created',
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while creating the duty: ${err ? err.toString() : 'Unknown Error'}`
                }
            }, assignmentDutyMapRequest);
    }
    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.createAssignmentDuty(assignment);
        return newAssignment;
    }

    setRequestData(moduleState: AssignmentModuleState, data: AssignmentDuty) {
        const newMap = { ...assignmentDutyMapRequest.getRequestData(moduleState) };
        newMap[data.id] = data;
        return assignmentDutyMapRequest.setRequestData(moduleState, newMap);
    }
}

export const createAssignmentDutyRequest = new CreateAssignmentDutyRequest();

// Assignment Duty Edit
class UpdateAssignmentDutyRequest extends UpdateEntityRequest<AssignmentDuty, AssignmentModuleState> {
    constructor(config?: RequestConfig<AssignmentDuty>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateAssignmentDuty',
                toasts: {
                    success: 'Duty Updated',
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating the duty: ${err ? err.toString() : 'Unknown Error'}`
                },
                ...config
            },
            assignmentDutyMapRequest);
    }

    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.updateAssignmentDuty(assignment);
        return newAssignment;
    }
}

export const updateAssignmentDutyRequest = new UpdateAssignmentDutyRequest();

export const assignSheriffRequest = new UpdateAssignmentDutyRequest({
    namespace: STATE_KEY,
    actionName: 'updateAssignmentDuty',
    toasts: {
        success: undefined,
        // tslint:disable-next-line:max-line-length
        error: (err) => `Problem encountered when assigning sheriff to the duty: ${err ? err.toString() : 'Unknown Error'}`
    }
});

// Assignment Duty Delete
class DeleteAssignmentDutyRequest extends DeleteEntityRequest<AssignmentDuty, AssignmentModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'deleteAssignmentDuty',
                toasts: {
                    success: 'Duty Deleted',
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while deleting the duty: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            assignmentDutyMapRequest);
    }
    public async  doWork(id: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignmentDuty(id);
        return id;
    }
}

export const deleteAssignmentDutyRequest = new DeleteAssignmentDutyRequest();

// Create assingment duties
class CreateDefaultDutiesRequest extends RequestAction<DateType, AssignmentDuty[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'createDefaultDuties',
            toasts: {
                // tslint:disable-next-line:max-line-length
                success: (duties) => duties.length > 0 ? `${duties.length} ${duties.length === 1 ? 'duty' : 'duties'} imported` : 'Default duties for this day have already been imported',
                error: (err) => `Problem encountered while importing duties: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: DateType, { api }: ThunkExtra): Promise<AssignmentDuty[]> {
        return await api.createDefaultDuties(request);
    }

    setRequestData(moduleState: AssignmentModuleState, newDuties: AssignmentDuty[] = []) {
        const newMap = { ...assignmentDutyMapRequest.getRequestData(moduleState) };
        newDuties.forEach(nd => newMap[nd.id] = nd);
        return assignmentDutyMapRequest.setRequestData(moduleState, newMap);
    }
}

export const createDefaultDutiesRequest = new CreateDefaultDutiesRequest();

// Delete Sheriff Duty 
class DeleteSheriffDutyRequest extends RequestAction<string, string, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'deleteSheriffDuty' });
    }
    public async doWork(id: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteSheriffDuty(id);
        return id;
    }

    setRequestData(moduleState: AssignmentModuleState, id: string) {
        const newMap = { ...assignmentDutyMapRequest.getRequestData(moduleState) };
        let sheriffDutyParent: AssignmentDuty | undefined =
            Object.keys(newMap).map((key) => newMap[key] as AssignmentDuty)
                .find(ad => ad.sheriffDuties.some(sd => sd.id === id));

        if (sheriffDutyParent) {
            const sheriffDutyIndex = sheriffDutyParent.sheriffDuties.findIndex(sd => sd.id === id);
            sheriffDutyParent.sheriffDuties.splice(sheriffDutyIndex, 1);
            newMap[sheriffDutyParent.id] = sheriffDutyParent;
        }

        return assignmentDutyMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteSheriffDutyRequest = new DeleteSheriffDutyRequest();

class ReassignSheriffDutyRequest extends RequestAction<
    SheriffDutyReassignmentDetails, SheriffDuty[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'reassignSheriffDuty',
            toasts: {
                success: 'Sheriff has been reassigned',
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while reassigning sheriff: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }

    public async doWork(reassignment: SheriffDutyReassignmentDetails, { api }: ThunkExtra): Promise<SheriffDuty[]> {
        let updatedSheriffDuties = await api.reassignSheriffDuty(reassignment);
        return updatedSheriffDuties;
    }

    setRequestData(moduleState: AssignmentModuleState, updatedDuties: SheriffDuty[] = []) {
        const newMap = { ...assignmentDutyMapRequest.getRequestData(moduleState) } as MapType<AssignmentDuty>;

        updatedDuties.forEach(updatedSd => {
            const sheriffDutyParent = newMap[updatedSd.dutyId];

            if (sheriffDutyParent) {
                const sheriffDutyIndex = sheriffDutyParent.sheriffDuties.findIndex(sd => sd.id === updatedSd.id);
                // if it already exists, replace it in the array
                if (sheriffDutyIndex >= 0) {
                    sheriffDutyParent.sheriffDuties[sheriffDutyIndex] = updatedSd;
                } else {
                    sheriffDutyParent.sheriffDuties.push(updatedSd);
                }

                newMap[sheriffDutyParent.id] = sheriffDutyParent;
            }
        });

        return assignmentDutyMapRequest.setRequestData(moduleState, newMap);
    }
}

export const reassignSheriffDutyRequest = new ReassignSheriffDutyRequest();