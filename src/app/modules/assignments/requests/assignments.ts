import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    IdType,
    Assignment
} from '../../../api/index';
import { DateRange } from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import DeleteEntityRequest from '../../../infrastructure/Requests/DeleteEntityRequest';
import RequestAction from '../../../infrastructure/RequestAction';

// Assignment Map
class AssignmentMapRequest extends GetEntityMapRequest<DateRange, Assignment, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'assignmentMap') {
        super(namespace, actionName);
    }
    public async doWork(request: DateRange, { api }: ThunkExtra) {
        let assignments = await api.getAssignments(request);
        return arrayToMap(assignments, t => t.id);
    }
}

export const assignmentMapRequest = new AssignmentMapRequest();

// Assignment Create
class CreateAssignmentRequest extends CreateEntityRequest<Assignment, AssignmentModuleState> {
    constructor() {
        super(STATE_KEY, 'createAssignment', assignmentMapRequest);
    }
    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.createAssignment(assignment);
        return newAssignment;
    }
}

export const createAssignmentRequest = new CreateAssignmentRequest();

// Assignment Edit
class UpdateAssignmentRequest extends UpdateEntityRequest<Assignment, AssignmentModuleState> {
    constructor() {
        super(STATE_KEY, 'updateAssignment', assignmentMapRequest);
    }

    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.updateAssignment(assignment);
        return newAssignment;
    }
}

export const updateAssignmentRequest = new UpdateAssignmentRequest();

// Assignment Delete
class DeleteAssignmentRequest extends DeleteEntityRequest<Assignment, AssignmentModuleState> {
    constructor() {
        super(STATE_KEY, 'deleteAssignment', assignmentMapRequest);
    }

    public async doWork(assignmentIdToDelete: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignment(assignmentIdToDelete);
        return assignmentIdToDelete;
    }
}

export const deleteAssignmentRequest = new DeleteAssignmentRequest();

class DeleteAssignmentDutyRecurrenceRequest extends RequestAction<string, string, AssignmentModuleState> {
    constructor() {
        super(STATE_KEY, 'deleteAssignmentDutyRecurrence');
    }

    public async doWork(id: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteDutyRecurrence(id);
        return id;
    }

    setRequestData(moduleState: AssignmentModuleState, id: string) {
        const newMap = { ...assignmentMapRequest.getRequestData(moduleState) };
        let dutyRecurrenceParent: Assignment | undefined =
            Object.keys(newMap).map((key) => newMap[key] as Assignment)
                .find(
                    a => {
                        if (a.dutyRecurrences) {
                            return a.dutyRecurrences.some(dr => dr.id === id);
                        } else {
                            return false;
                        }
                    });

        if (dutyRecurrenceParent && dutyRecurrenceParent.dutyRecurrences) {
            const recurrenceIndex = dutyRecurrenceParent.dutyRecurrences.findIndex(dr => dr.id === id);
            dutyRecurrenceParent.dutyRecurrences.splice(recurrenceIndex, 1);
            newMap[dutyRecurrenceParent.id] = dutyRecurrenceParent;
        }
        return assignmentMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteAssignmentDutyRecurrenceRequest = new DeleteAssignmentDutyRecurrenceRequest();