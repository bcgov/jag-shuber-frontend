import * as moment from 'moment';
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
    WorkSectionCode,
    DateType,
    SheriffDuty,
    AssignmentDutyDetails,
    Courthouse
} from './Api';
import {
    isCourtAssignment,
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment
} from './utils';
import { renameKeysInObject } from '../infrastructure/objectUtils';
import {
    createClient,
    HalRestClient,
    HalResource,
    HalProperty
} from 'hal-rest-client';
import MockApi from './Mock/MockApi';
import { AxiosRequestConfig } from 'axios';

const API_DATE_FORMAT = 'YYYY-MM-DD';
const API_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export function toServerDateTime(timeMoment: any) {
    return moment(timeMoment).format(API_DATETIME_FORMAT);
}

export function extractWorksectionCode(workSectionCodePath: string): WorkSectionCode {
    const code = `${workSectionCodePath}`.split('/').slice(-1)[0] as any;
    return code !== '' ? code : 'OTHER';
}

export function toWorkSectionCodePath(workSectionCode: WorkSectionCode = 'OTHER'): string {
    return `/workSectionCodes/${workSectionCode}`;
}

interface APIErrorResponse extends Error {
    config?: AxiosRequestConfig;
    response?: {
        status: number,
        data?: {
            fieldErrors?: {
                code: string;
                defaultMessage: string;
                field: string;
                localizedMessage: string;
                objectName: string;
                rejectedValue: any;
            }[],
            globalErrors?: {
                code: string;
                defaultMessage: string;
                localizedMessage: string;
                objectName: string;
            }[]
            message?: string;
        }
    };
}

class APIError extends Error {
    _isAPIError = true;
    status: number;
    // get status(): number | undefined {
    //     return this._error!.response!.status;
    // }

    private _error?: APIErrorResponse;
    static isAPIError(error: any): error is APIError {
        return (<APIError>error)._isAPIError === true;
    }

    static constructFromResponse(originalError?: APIErrorResponse) {
        if (APIError.isAPIError(originalError)) {
            return originalError;
        }
        const apiError = new APIError(APIError.parseErrorMessage(originalError));
        apiError._error = originalError;
        apiError.status = originalError!.response!.status;
        return apiError;
    }

    static parseErrorMessage(error?: APIErrorResponse) {
        let message = 'Unknown Error';
        if (error) {
            const messageParts: string[] = [];
            const {
                response: {
                    data: {
                        fieldErrors = [],
                globalErrors = [],
                message: dataMessage = ''
                    } = {}
                } = {}
            } = error;
            if (error.message) {
                messageParts.push(error.message);
            }
            if (dataMessage) {
                messageParts.push(dataMessage);
            }

            fieldErrors.forEach(fe => {
                messageParts.push(`Field '${fe.field}' ${fe.localizedMessage}`);
            });
            globalErrors.forEach(ge => {
                messageParts.push(`${ge.defaultMessage}`);
            });
            message = messageParts.join('\r\n');
        }
        return message;
    }

    constructor(message?: string) {
        super(message);
    }
}

// All of our resources now have an idPath
// so we'll specify a HalResource that contains that
class APIResource extends HalResource {
    @HalProperty()
    id: string;
}

export default class Client implements API {
    private _halClient: HalRestClient;
    private _courthouseId: string;
    private _courthouseIdPath: string;
    private _mockApi: MockApi;

    constructor(private baseUrl: string = '/', private _courthouseCode: string) {
        this._halClient = createClient(this.baseUrl);

        // Setup some interceptors on the response / errors
        this._halClient.interceptors.response.use(
            (response) => {
                // Here we're renaming any key with idPath as id so that our frontend
                // doesn't have to know about idPaths
                const newData = renameKeysInObject(response.data, /([iI]d)Path/, '$1');
                response.data = newData;
                return response;
            },
            (error) => {
                return Promise.reject(APIError.constructFromResponse(error));
            }
        );
        this._mockApi = new MockApi();
    }

    async deleteResource(idPath: string): Promise<void> {
        if (idPath === undefined || idPath === '') {
            return;
        }
        await this._halClient.delete(idPath);
    }

    async getResource(idPath: string): Promise<APIResource> {
        return await this._halClient.fetch(idPath, APIResource);
    }

    async getCurrentCourtHousePath() {
        if (!this._courthouseIdPath) {
            // tslint:disable-next-line:max-line-length
            const courthouse = await this._halClient.fetchResource(`/courthouses/search/findByCourthouseCd?courthouseCd=${this._courthouseCode}`);
            this._courthouseIdPath = (courthouse.props as any).id;
        }
        return this._courthouseIdPath;
    }

    get isCourthouseSet() {
        return this._courthouseIdPath != undefined;
    }

    setCurrentCourthouse(id: IdType) {
        this._courthouseIdPath = id;
    }

    get currentCourthouse(): string {
        return this._courthouseIdPath;
    }

    async getSheriffs(): Promise<Sheriff[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        const sheriffList = (
            await this._halClient.fetchArray(`${courthousePath}/sheriffs`, APIResource)
        ).map(sr => sr.props as Sheriff);
        return sheriffList;
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
            workSectionCodePath,
            jailRoleCodePath: jailRoleId,
            otherAssignCodePath: otherAssignmentTypeId,
            dutyRecurrences = [],
            ...restAssignment,
        } = props;
        return {
            ...restAssignment,
            workSectionId: extractWorksectionCode(workSectionCodePath),
            jailRoleId,
            otherAssignmentTypeId,
            dutyRecurrences: (dutyRecurrences as any[]).map(({ idPath, ...restRecurrence }) => (
                {
                    assignmentIdPath: restAssignment.id,
                    ...restRecurrence
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
            // currently we do not use this attribute explicity in the front-end, so setting it to 'title' for now
            title: 'title',
            effectiveDate: moment().toISOString()
        };

        if (isJailAssignment(assignment)) {
            assignmentToCreate.jailRoleCode = assignment.jailRoleId;
        } else if (isCourtAssignment(assignment)) {
            assignmentToCreate.courtroom = assignment.courtroomId;
        } else if (isEscortAssignment(assignment)) {
            assignmentToCreate.run = assignment.runId;
        } else if (isOtherAssignment(assignment)) {
            assignmentToCreate.otherAssignCode = assignment.otherAssignmentTypeId;
        }

        let created = await this._halClient.create(`/assignments`, assignmentToCreate, APIResource);

        // This is a bit of hack, taking the idPath from the response and creating a new object with the id &
        // other properties from the original object.  This is because the api currently doesn't return us back
        // the hydrated object and I don't want to make the numerous requests to go and retrieve all of the 
        // info from each endpoint.
        let createdAssignment = {
            ...assignment,
            id: created.props.id
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
                    effectiveDate: moment().toISOString(),
                    assignment: assignmentId,
                    ...dutyRecurrenceToCreate
                });
            })
        );
        return createdRecurrences
            .map(r => ({
                ...r.props,
                assignmentIdPath: assignmentId
            })
            );
    }

    async deleteDutyRecurrence(recurrenceId: string): Promise<void> {
        if (recurrenceId === undefined) {
            return;
        } 
        
        await this.deleteResource(recurrenceId);
    }

    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        throw Error('Coming Soon!!');
        // console.warn('Using Mock API');
        // return this._mockApi.updateAssignment(assignment);
    }

    async deleteAssignment(assignmentId: IdType): Promise<void> {
        if (assignmentId === undefined) {
            return;
        }

        await this.deleteResource(assignmentId);
    }

    async getAssignmentDuties(startDate: DateType = moment(), endDate?: DateType): Promise<AssignmentDuty[]> {
        const courthousePath = await this.getCurrentCourtHousePath();
        let duties: AssignmentDuty[];
        try {
            const halResponse = await this._halClient.fetchArray(
                // tslint:disable-next-line:max-line-length
                `${courthousePath}/getDutiesByDateRange?startDate=${moment(startDate).format(API_DATE_FORMAT)}&endDate=${endDate !== undefined ? moment(endDate).format(API_DATE_FORMAT) : ''}`,
                APIResource);
            duties = this.unwrapSimpleDuties(halResponse);
        } catch (e) {
            duties = [];
        }
        return duties;
    }

    getAssignmentDutyDetails(): Promise<AssignmentDutyDetails[]> {
        console.warn('Using Mock API');
        return this._mockApi.getAssignmentDutyDetails();
    }

    updateAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        console.warn('Using Mock API');
        return this._mockApi.updateAssignmentDutyDetails(dutyDetails);
    }

    createAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        console.warn('Using Mock API');
        return this._mockApi.createAssignmentDutyDetails(dutyDetails);
    }

    async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        const {
            assignmentId,
            sheriffDuties = [],
            startDateTime,
            endDateTime,
            ...restDuty
        } = duty;

        const dutyToCreate: any = {
            ...restDuty,
            startDateTime: toServerDateTime(startDateTime),
            endDateTime: toServerDateTime(endDateTime),
            assignment: assignmentId
        };

        const apiCreatedDuty = await this._halClient.create('/duties', dutyToCreate);
        const { id, ...rest } = apiCreatedDuty.props;

        const createdDuty = {
            id,
            ...rest,
            assignmentId,
            sheriffDuties: await Promise.all(
                sheriffDuties
                    .map(sd => ({ ...sd, dutyId: id }))
                    .map(sd => this.createSheriffDuty(sd))
            )
        };

        return createdDuty;
    }
    async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        const {
            id,
            assignmentId: assignment,
            sheriffDuties = [],
            dutyRecurrenceId: dutyRecurrence,
            startDateTime,
            endDateTime,
            ...restDuty
        } = duty;

        const assignmentDutyUpdateTask = this._halClient.update(`${id}`, {
            assignment,
            startDateTime: toServerDateTime(startDateTime),
            endDateTime: toServerDateTime(endDateTime),
            dutyRecurrence,
            ...restDuty
        });

        const sheriffDutyUpdateTask = Promise.all(sheriffDuties.filter(sd => sd.id === undefined || sd.id === '')
            .map(sd => ({ ...sd, dutyId: id }))
            .map((sd) => this.createSheriffDuty(sd))
            .concat(sheriffDuties
                .filter(sd => sd.id !== undefined && sd.id !== '')
                .map(sd => this.updateSheriffDuty(sd))
            ));

        return {
            ...duty,
            sheriffDuties: (await sheriffDutyUpdateTask),
            ...(await assignmentDutyUpdateTask).props
        };
    }

    async deleteAssignmentDuty(idPath: IdType): Promise<void> {
        await this.deleteResource(idPath);
    }

    async createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        const {
            dutyId: duty,
            sheriffId: sheriff,
            startDateTime,
            endDateTime,
            ...restSheriffDuty
        } = sheriffDuty;
        const { props: { id } } = await this._halClient.create('/sheriffDuties', {
            duty,
            sheriff,
            startDateTime: toServerDateTime(startDateTime),
            endDateTime: toServerDateTime(endDateTime),
            ...restSheriffDuty
        });
        return { ...sheriffDuty, id } as SheriffDuty;
    }
    async updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        const {
                id,
            dutyId: duty,
            sheriffId: sheriff,
            startDateTime,
            endDateTime,
            ...restDuty
            } = sheriffDuty;

        const halResponse = await this._halClient.update(`${id}`, {
            duty,
            sheriff,
            startDateTime: toServerDateTime(startDateTime),
            endDateTime: toServerDateTime(endDateTime),
            ...restDuty
        });
        return {
            ...sheriffDuty,
            ...halResponse.props
        } as SheriffDuty;
    }
    async deleteSheriffDuty(sheriffDutyId: string): Promise<void> {
        await this.deleteResource(sheriffDutyId);
    }

    private unwrapSimpleDuties(halDuties: APIResource[]): AssignmentDuty[] {
        const duties = halDuties.map((d: any) => {
            const { sheriffDuties = [], ...duty } = d.props;
            duty.sheriffDuties = sheriffDuties.map((sd: any) => sd.props);
            return duty;
        });
        return duties;
    }

    async createDefaultDuties(date: moment.Moment = moment()): Promise<AssignmentDuty[]> {
        const courthouseIdPath = await this.getCurrentCourtHousePath();
        const halResponse = await this._halClient.create(`${courthouseIdPath}/createDefaultDuties?date=${date.format("YYYY-MM-DD")}`, {}, APIResource);
        const createdDuties = this.unwrapSimpleDuties(halResponse.props.duties);
        return createdDuties;
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

    async getCourthouses(): Promise<Courthouse[]> {
        const resourceList =
            await this._halClient.fetchArray(
                `/courthouses`,
                APIResource
            );

        const list = resourceList.map(ar => ar.props)
            .map<Courthouse>((props: any) => {
                return {
                    id: props.id,
                    name: props.courthouseName,
                    code: props.courthouseCd
                };
            });
        return list as Courthouse[];
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
                id,
                courtroomCd: code,
                courtroomName: name,
            }) => {
                return {
                    id,
                    code,
                    name,
                    courthouseId: courthousePath
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
                    id: props.id,
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
                    id: props.id,
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
                    id: props.id,
                    description: props.description,
                };
            });
        return list as AlternateAssignment[];
    }

}