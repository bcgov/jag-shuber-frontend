import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    IdType,
    Assignment,
    DateRange
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import DeleteEntityRequest from '../../../infrastructure/Requests/DeleteEntityRequest';
import RequestAction from '../../../infrastructure/Requests/RequestActionBase';
import toTitleCase from '../../../infrastructure/toTitleCase';

// Assignment Map
class AssignmentMapRequest extends GetEntityMapRequest<DateRange, Assignment, AssignmentModuleState> {
    constructor() {
        super({ 
            namespace: STATE_KEY, 
            actionName: 'assignmentMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving the assignment list: ${err ? err.toString() : 'Unknown Error'}`
            } 
        });
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
        super({ 
            namespace: STATE_KEY, 
            actionName: 'createAssignment',
            toasts: {
                success: (a) => `Assignment created for ${toTitleCase(a.workSectionId)}`,
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while creating the assignment: ${err ? err.toString() : 'Unknown Error'}`
            }
        }, assignmentMapRequest);
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
        super({ 
            namespace: STATE_KEY, 
            actionName: 'updateAssignment',
            toasts: {
                success: (a) => `${toTitleCase(a.workSectionId)} assignment updated`,
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while updating the assignment: ${err ? err.toString() : 'Unknown Error'}`
            } 
        }, 
        assignmentMapRequest);
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
        super({ 
            namespace: STATE_KEY, 
            actionName: 'deleteAssignment',
            toasts: {
                success: 'Assignment deleted',
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while deleting the assignment: ${err ? err.toString() : 'Unknown Error'}`
            } 
        }, 
        assignmentMapRequest);
    }

    public async doWork(assignmentIdToDelete: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignment(assignmentIdToDelete);
        return assignmentIdToDelete;
    }
}

export const deleteAssignmentRequest = new DeleteAssignmentRequest();

class DeleteAssignmentDutyRecurrenceRequest extends RequestAction<string, string, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'deleteAssignmentDutyRecurrence' });
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