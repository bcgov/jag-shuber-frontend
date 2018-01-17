import { randomDelay } from './PromiseExtensions';
// import { fetchRandomPeople } from './_randomPeople';
import * as moment from 'moment';

export enum SheriffAbility {
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}

type DateType = Date | number | moment.Moment;

export const ASSIGNMENT_TYPES = {
    courtSecurity: "Court Security",
    documentServices: "Document Services",
    escortServices: "Escort Services",
    gateSecurity: "Gate Security",
    other: "Other"
}

export const BLANK_SHERIFF: Sheriff = {
    firstName: "",
    lastName: "",
    badgeNumber: -1,
    imageUrl: "/img/avatar.png",
    abilities: SheriffAbility.None,
    training: [{
        trainingType: "",
        certificationDate: "",
        expiryDate: "",
    }],
    permanentCourthouse: "",
    permanentRegion: "",
    currentCourthouse: "",
    currentRegion: "",
    onDuty:false
}

export const TRAINING_TYPES = {
    FRO: "FRO - Forced Response Option",
    PISTOL: "PISTOL",
    CID: "CID - Critical Incident De-Escalation",
    CEW: "CEW - Conductive Energy Weapon"
}

export interface SheriffTraining {
    trainingType: string;
    certificationDate: string;
    expiryDate: string;
}

export interface Sheriff {
    firstName: string;
    lastName: string;
    badgeNumber: number;
    imageUrl?: string;
    abilities?: SheriffAbility;
    training: SheriffTraining[];
    permanentCourthouse?: string;
    permanentRegion?: string;
    currentCourthouse?: string;
    currentRegion?: string;
    onDuty:boolean;
}

export interface SheriffAssignment {
    id: number;
    assignmentType: string;
    notes: string;
    requiredAbilities: SheriffAbility;
    sheriffIds: number[];
    startTime: DateType,
    endTime: DateType,
    sherrifsRequired: number | string,
    //attributes for gate security assignments
    gateNumber?: number | string, 
    //attributes for escort security assignments
    pickupLocation?: string,
    dropoffLocation?: string,
    //attributes court security assignments
    courtRoom?: string, 
    assignmentCourt?: boolean

}

export interface API {
    getSheriffs(): Promise<SheriffMap>;
    getSheriffAssignments(): Promise<SheriffAssignmentMap>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;
    createAssignment(newAssignment: SheriffAssignment): Promise<SheriffAssignment>;
}

export type SheriffMap = { [key: number]: Sheriff }

export type SheriffAssignmentMap = { [key: number]: SheriffAssignment }

function arrayToMap<T, TKey>(array: T[], keySelector: (t: T) => TKey) {
    const mappedArray = array.reduce<any>((map, i) => {
        map[keySelector(i)] = i;
        return map;
    }, {});
    return mappedArray;
}


class Client implements API {

    async getSheriffs(): Promise<SheriffMap> {
        
        return arrayToMap(sheriffList, (s) => s.badgeNumber) as SheriffMap;
    }

    async getSheriffAssignments(): Promise<SheriffAssignmentMap> {
        // await randomDelay(200, 1000);
        const assignmentMap: SheriffAssignmentMap = arrayToMap(assignments, (t) => t.id);
        return Promise.resolve(assignmentMap);
    }

    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();

        //This is a hack to throw in a profile picture
        if (!newSheriff.imageUrl) {
            //let randomNumber = Math.floor(Math.random() * 86) + 11; 
            // newSheriff.imageUrl=`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
            newSheriff.imageUrl = "/img/avatar.png"
        }

        sheriffList.push(newSheriff);
        return newSheriff;
    }

    async updateSheriff(sheriffToUpdate:Partial<Sheriff>):Promise<Sheriff>{
        const index = sheriffList.findIndex(s=>s.badgeNumber===sheriffToUpdate.badgeNumber);
        await randomDelay();
        sheriffList[index] = Object.assign({},sheriffList[index],sheriffToUpdate);
        return sheriffList[index];
    }

    async createAssignment(newAssignment: SheriffAssignment): Promise<SheriffAssignment> {
        await randomDelay();
        //This is a hack to create a unique id for a new assignment
        newAssignment.id = assignments.length;
        assignments.push(newAssignment);

        return newAssignment;
    }
}

let sheriffList: Sheriff[] = [
    {
        firstName: "Garfield",
        lastName: "Shirley",
        badgeNumber: 969,
        imageUrl: '/img/garfield_shirley.jpg',
        permanentRegion: "Van Centre",
        permanentCourthouse: "Vancouver - 222 Main",
        currentRegion: "Van Centre",
        currentCourthouse: "Vancouver - 222 Main",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: true
    },
    {
        firstName: "Jaqueline",
        lastName: "Jackson",
        badgeNumber: 204,
        imageUrl: '/img/jaqueline_jackson.jpg',
        permanentRegion: "Interior",
        permanentCourthouse: "Kamloops",
        currentRegion: "Interior",
        currentCourthouse: "Kamloops",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: true
    },
    {
        firstName: "Landon",
        lastName: "Bludnell",
        badgeNumber: 790,
        imageUrl: '/img/landon_bludnell.jpg',
        permanentRegion: "Northern",
        permanentCourthouse: "Prince George",
        currentRegion: "Northern",
        currentCourthouse: "Prince George",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: false
    },
    {
        firstName: "Rob",
        lastName: "Lucas",
        badgeNumber: 987,
        imageUrl: '/img/rob_lucas.jpg',
        permanentRegion: "Fraser",
        permanentCourthouse: "New Westminster",
        currentRegion: "Fraser",
        currentCourthouse: "New Westminster",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: true
    },
    {
        firstName: "Steve",
        lastName: "Gill",
        badgeNumber: 932,
        imageUrl: '/img/steve_gill.jpg',
        permanentRegion: "Fraser",
        permanentCourthouse: "Surrey",
        currentRegion: "Fraser",
        currentCourthouse: "Surrey",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: false
    },
    {
        firstName: "Steve",
        lastName: "Jervis",
        badgeNumber: 579,
        imageUrl: '/img/steve_jervis.jpg',
        permanentRegion: "Van Centre",
        permanentCourthouse: "Vancouver - VLC",
        currentRegion: "Van Centre",
        currentCourthouse: "Vancouver - VLC",
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        abilities: SheriffAbility.All,
        onDuty: true
    }
];

const assignments: SheriffAssignment[] = [
    {
        id: 0,
        assignmentType: 'Court Security',
        courtRoom: 'Courtroom 101',
        assignmentCourt: true,
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 1,
        assignmentType: ASSIGNMENT_TYPES.escortServices,
        pickupLocation: 'Courthouse A',
        dropoffLocation: 'Location Z',
        notes: 'My notes on this escort.',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [],
        startTime: moment().add(3, 'hour'),
        endTime: moment().add(4, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 2,
        assignmentType: ASSIGNMENT_TYPES.documentServices,
        notes: 'Serve documents A, B, and C',
        requiredAbilities: SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(4, 'hour'),
        endTime: moment().add(5, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 3,
        assignmentType: ASSIGNMENT_TYPES.other,
        notes: 'Attending co-design session for SHUBER',
        requiredAbilities: SheriffAbility.All,
        sheriffIds: [],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 4,
        assignmentType: ASSIGNMENT_TYPES.gateSecurity,
        gateNumber: 10,
        notes: 'My notes on this gate',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(1, 'hour'),
        endTime: moment().add(2, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 5,
        assignmentType: ASSIGNMENT_TYPES.courtSecurity,
        courtRoom: 'Courtroom 202',
        assignmentCourt: false,
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    }
];

export default new Client();