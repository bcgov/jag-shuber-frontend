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
        // if (sheriffList.length == 0) {
        //     let people = await fetchRandomPeople(5);
        //     let badgeNumber = 0;

        //     sheriffList = people.results.map(p => {
        //         let s: Sheriff = {
        //             firstName: p.name.first,
        //             lastName: p.name.last,
        //             badgeNumber: badgeNumber++,
        //             imageUrl: p.picture.large,
        //             permanentRegion: "Perm Region",
        //             permanentCourthouse: "Perm Courthouse",
        //             currentRegion: "Curr Region",
        //             currentCourthouse: "Curr Courthouse",
        //             training: [
        //                 { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
        //                 { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
        //                 { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
        //                 { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        //             ],
        //             abilities: SheriffAbility.All
        //         };
        //         return s;
        //     });
        // }
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
        abilities: SheriffAbility.All
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
        abilities: SheriffAbility.All
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
        abilities: SheriffAbility.All
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
        abilities: SheriffAbility.All
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
        abilities: SheriffAbility.All
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
        abilities: SheriffAbility.All
    }
];

const assignments: SheriffAssignment[] = [
    {
        id: 0,
        assignmentType: 'Court Security',
        notes: 'Courtroom 101 (10:00am)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 1,
        assignmentType: 'Escort Service',
        notes: 'Transfer from Location Y to Courthouse B',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [3],
        startTime: moment().add(3, 'hour'),
        endTime: moment().add(4, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 2,
        assignmentType: 'Document Service',
        notes: 'Serve documents A, B, and C',
        requiredAbilities: SheriffAbility.CourtAppearance,
        sheriffIds: [1],
        startTime: moment().add(4, 'hour'),
        endTime: moment().add(5, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 3,
        assignmentType: 'Court Security',
        notes: 'Courtroom 101 (2:00pm)',
        requiredAbilities: SheriffAbility.All,
        sheriffIds: [0, 4],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 4,
        assignmentType: 'Court Security',
        notes: 'Courtroom 102 (2:00pm)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(1, 'hour'),
        endTime: moment().add(2, 'hour'),
        sherrifsRequired: 1
    },
    {
        id: 5,
        assignmentType: 'Escort Service',
        notes: 'Transfer from Courthouse B to Location X',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(6, 'hour'),
        endTime: moment().add(7, 'hour'),
        sherrifsRequired: 1
    },
];

export default new Client();