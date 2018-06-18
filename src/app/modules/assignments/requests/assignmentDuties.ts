import RequestAction from '../../../infrastructure/Requests/RequestActionBase';
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
    DateType
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
                error: (e) => `Couldn\'t retreive list of Assignments: ${e ? e.toString() : 'unknown error'}`
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
                    success: 'Created Duty'
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
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateAssignmentDuty',
                toasts: {
                    success: 'Updated Duty'
                }
            },
            assignmentDutyMapRequest);
    }

    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.updateAssignmentDuty(assignment);
        return newAssignment;
    }
}

export const updateAssignmentDutyRequest = new UpdateAssignmentDutyRequest();

// Assignment Duty Delete
class DeleteAssignmentDutyRequest extends DeleteEntityRequest<AssignmentDuty, AssignmentModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'deleteAssignmentDuty',
                toasts: {
                    success: 'Deleted Duty',
                    error: 'Couldn\'t delete Duty'
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
                success: (duties) => duties.length > 0 ? `Imported ${duties.length} new Duties` : 'No duties to import for this day',
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
