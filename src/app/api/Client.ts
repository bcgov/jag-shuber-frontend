import {
    Sheriff,
    AssignmentDuty,
    Courtroom,
    API,
    Shift,
    CourtAssignment,
    EscortAssignment,
    JailAssignment,
    OtherAssignment,
    ShiftCopyOptions,
    Leave,
    Assignment,
    RecurrenceInfo,
    Run,
    JailRole,
    AlternateAssignment,
    IdType,
    WorkSectionCode
} from './Api';
import {
    isCourtAssignment,
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment
} from './utils';
import { 
    createClient, 
    HalRestClient, 
    HalResource, 
    HalProperty 
} from 'hal-rest-client';
import MockApi from './Mock/MockApi';


// All of our resources now have an idPath
// so we'll specify a HalResource that contains that
class APIResource extends HalResource {
    @HalProperty()
    idPath: string;
}

export function extractWorksectionCode(workSectionCodePath: string): WorkSectionCode {
    const code = `${workSectionCodePath}`.split('/').slice(-1)[0] as any;
    return code !== '' ? code : 'OTHER';
}

export function toWorkSectionCodePath(workSectionCode: WorkSectionCode = 'OTHER'): string {
    return `/workSectionCodes/${workSectionCode}`;
}

export default class Client implements API {
    private _halClient: HalRestClient;
    private _courthouseId: string;
    private _courthouseIdPath: string;
    private _mockApi: MockApi;

    constructor(private baseUrl: string = '/', private _courthouseCode: string) {
        this._halClient = createClient(this.baseUrl);
        this._mockApi = new MockApi();
    }

    async getCurrentCourtHousePath() {
        if (!this._courthouseIdPath) {
            const courthouse = await this._halClient.fetchResource(`/courthouses/search/findByCourthouseCd?courthouseCd=${this._courthouseCode}`);
            this._courthouseIdPath = (courthouse.props as any).idPath;
        }
        return this._courthouseIdPath;
    }

    get currentCourthouse() {
        return this._courthouseIdPath;
    }

    async getSheriffs(): Promise<Sheriff[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        const sheriffList = (await this._halClient.fetchArray(`${courthousePath}/sheriffs`, APIResource)
        ).map(sr => sr.props as any)
            .map(({ idPath: id, ...rest }) => ({ ...rest, id }));
        return sheriffList as Sheriff[];
    }
    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        // const { badgeNo: badgeNo, sheriffId: userid, ...rest } = newSheriff;
        // const newSheriffResource = {
        //     ...rest,
        //     badgeNo,
        //     userid: 'bla'
        // };

        // try {
        //     const createdSheriff = await this._halClient.create('/sheriffs', newSheriffResource, SheriffResource);
        //     return createdSheriff.props;
        // } catch (e) {
        //     throw Error(`Error creating sheriff: ${e}`);
        // }
        throw Error('Not implemented');
    }
    async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
        //return await this._halClient.update('/sheriffs', sheriffToUpdate, true, SheriffResource);
        throw Error('Not Implemented');
    }

    private convertAssignmentResource(props: any): Assignment {
        const {
            idPath: id,
            title,
            workSectionCodePath,
            courthouseIdPath: courthouseId,
            jailRoleCodePath: jailRoleId,
            otherAssignCodePath: otherAssignmentTypeId,
            runIdPath: runId,
            courtroomIdPath: courtroomId,
            dutyRecurrences = []
        } = props;
        return {
            id,
            title,
            workSectionId: extractWorksectionCode(workSectionCodePath),
            courthouseId,
            courtroomId,
            jailRoleId,
            otherAssignmentTypeId,
            runId,
            dutyRecurrences: (dutyRecurrences as any[]).map(({ idPath, ...rest }) => (
                {
                    assignmentIdPath: id,
                    ...rest,
                    id: idPath
                })
            )
        } as Assignment;
    }

    async getAssignments(): Promise<(CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment)[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        const resourceList =
            await this._halClient.fetchArray(
                `${courthousePath}/assignments?projection=simpleAssignment`,
                APIResource
            );
        const list = resourceList
            .map(ar => ar.props as any)
            .map<Assignment>(this.convertAssignmentResource);

        return list as Assignment[];
    }
    async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        const courthousePath = await this.getCurrentCourtHousePath();
        let assignmentToCreate: any = {
            courthouse: courthousePath,
            workSectionCode: toWorkSectionCodePath(assignment.workSectionId),
        };

        if (isJailAssignment(assignment)) {
            assignmentToCreate.jailRoleCode = assignment.jailRoleId;
            assignmentToCreate.title = assignment.jailRoleId;
        } else if (isCourtAssignment(assignment)) {
            assignmentToCreate.courtroom = assignment.courtroomId;
            assignmentToCreate.title = assignment.courtroomId;
        } else if (isEscortAssignment(assignment)) {
            assignmentToCreate.run = assignment.runId;
            assignmentToCreate.title = assignment.runId;
        } else if (isOtherAssignment(assignment)) {
            assignmentToCreate.otherAssignCode = assignment.otherAssignmentTypeId;
            assignmentToCreate.title = assignment.otherAssignmentTypeId;
        }

        let created = await this._halClient.create(`/assignments`, assignmentToCreate, APIResource);

        // This is a bit of hack, taking the idPath from the response and creating a new object with the id &
        // other properties from the original object.  This is because the api currently doesn't return us back
        // the hydrated object and I don't want to make the numerous requests to go and retrieve all of the 
        // info from each endpoint.
        let createdAssignment = {
            ...assignment,
            id: created.props.idPath
        };

        createdAssignment.dutyRecurrences = await this.createRecurrences(
            createdAssignment.id,
            assignment.dutyRecurrences
        );
        return createdAssignment as Assignment;
    }

    async createRecurrences(assignmentId: IdType, recurrences: RecurrenceInfo[] = []): Promise<any[]> {
        const createdRecurrences = await Promise.all(
            recurrences.map(async (dutyRecurrenceToCreate) => {
                return await this._halClient.create('/dutyRecurrences', {
                    assignment: assignmentId,
                    ...dutyRecurrenceToCreate
                });
            })
        );
        return createdRecurrences
            .map(r => r.props)
            .map(({ idPath: id, ...rest }) => ({
                ...rest,
                id,
                assignmentIdPath: assignmentId
            }));
    }

    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        throw Error("Coming Soon!!");
        // console.warn('Using Mock API');
        // return this._mockApi.updateAssignment(assignment);
    }

    async deleteAssignment(assignmentId: IdType): Promise<void> {
        if (assignmentId === undefined) {
            return;
        }

        // Delete the recurrences
        const recurrences = await this._halClient.fetchArray(`${assignmentId}/dutyRecurrences`, APIResource);
        await Promise.all(recurrences.map((r: any) => {
            return this._halClient.delete(r.idPath);
        }));

        // delete the assignment
        await this._halClient.delete(assignmentId);
    }
    getAssignmentDuties(): Promise<AssignmentDuty[]> {
        console.warn('Using Mock API');
        return this._mockApi.getAssignmentDuties();
    }
    createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        console.warn('Using Mock API');
        return this._mockApi.createAssignmentDuty(duty);
    }
    updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        console.warn('Using Mock API');
        return this._mockApi.updateAssignmentDuty(duty);
    }
    deleteAssignmentDuty(dutyId: IdType): Promise<void> {
        console.warn('Using Mock API');
        return this._mockApi.deleteAssignmentDuty(dutyId);
    }

    getShifts(): Promise<Shift[]> {
        console.warn('Using Mock API');
        return this._mockApi.getShifts();
    }
    updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift> {
        console.warn('Using Mock API');
        return this._mockApi.updateShift(shiftToUpdate);
    }
    createShift(newShift: Partial<Shift>): Promise<Shift> {
        console.warn('Using Mock API');
        return this._mockApi.createShift(newShift);
    }
    deleteShift(shiftId: IdType): Promise<void> {
        console.warn('Using Mock API');
        return this._mockApi.deleteShift(shiftId);
    }

    copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
        console.warn('Using Mock API');
        return this._mockApi.copyShifts(shiftCopyDetails);
    }
    getLeaves(): Promise<Leave[]> {
        console.warn('Using Mock API');
        return this._mockApi.getLeaves();
    }

    async getCourtrooms(): Promise<Courtroom[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        const resourceList =
            await this._halClient.fetchArray(
                `${courthousePath}/courtrooms`,
                APIResource
            );

        const list = resourceList.map(ar => ar.props as any)
            .map<Courtroom>(({
                idPath: id,
                courtroomCd: code,
                courtroomName: name,
            }) => {
                return {
                    id,
                    code,
                    name,
                    courthouseId: id
                };
            });
        return list as Courtroom[];
    }

    async getRuns(): Promise<Run[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        const resourceList =
            await this._halClient.fetchArray(
                `${courthousePath}/runs`,
                APIResource
            );

        const list = resourceList.map(ar => ar.props)
            .map<Run>((props: any) => {
                return {
                    id: props.idPath,
                    description: props.title,
                    courthouseId: this._courthouseId
                };
            });
        return list as Run[];
    }

    async getJailRoles(): Promise<JailRole[]> {
        const resourceList =
            await this._halClient.fetchArray(
                `/jailRoleCodes`,
                APIResource
            );

        const list = resourceList.map(ar => ar.props)
            .map<JailRole>((props: any) => {
                return {
                    id: props.idPath,
                    title: props.description,
                };
            });
        return list as JailRole[];
    }

    async getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
        const resourceList =
            await this._halClient.fetchArray(
                `/otherAssignCodes`,
                APIResource
            );

        const list = resourceList.map(ar => ar.props)
            .map<AlternateAssignment>((props: any) => {
                return {
                    id: props.idPath,
                    description: props.description,
                };
            });
        return list as AlternateAssignment[];
    }

}