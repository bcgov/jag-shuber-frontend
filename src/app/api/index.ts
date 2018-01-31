import { randomDelay } from './PromiseExtensions';
import * as moment from 'moment';


type DateType = Date | number | moment.Moment;
type StringMap = {[key:string]:string};

export enum SheriffAbility {
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}

export const ASSIGNMENT_TYPES = {
    courtSecurity: "Court Security",
    documentServices: "Document Services",
    escortServices: "Escort Services",
    gateSecurity: "Gate Security",
    other: "Other"
}

export const BLANK_SHERIFF_LOCATION: SheriffLocation = {
    courthouseId: "",
    regionId: ""
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
    permanentLocation: BLANK_SHERIFF_LOCATION,
    currentLocation: BLANK_SHERIFF_LOCATION,
    onDuty:false
}


export const TRAINING_TYPES: StringMap = {
    FRO: "FRO - Forced Response Option",
    PISTOL: "PISTOL",
    CID: "CID - Critical Incident De-Escalation",
    CEW: "CEW - Conductive Energy Weapon"
}

export const COURTHOUSES: StringMap = {
    ABBOTSFORD: "Abbotsford",
    ALEXISCREEK: "Alexis Creek",
    ANAHIMLAKE: "Anahim Lake",
    ASHCROFT: "Ashcroft",
    ATLIN: "Atlin",
    BELLABELLA: "Bella Bella",
    BELLACOOLA: "Bella Coola",
    BURNSLAKE: "Burns Lake",
    CAMPBELLRIVER: "Campbell River",
    CASTLEGAR: "Castlegar",
    CHASE: "Chase",
    CHETWYND: "Chetwynd",
    CHILLIWACK: "Chilliwack",
    CLEARWATER: "Clearwater",
    COURTENAY: "Courtenay",
    CRANBROOK: "Cranbrook",
    CRESTON: "Creston",
    DEASELAKE: "Dease Lake",
    DOWNTOWNCOMMUNITYCOURT: "Downtown Community Court",
    DUNCAN: "Duncan",
    FERNIE: "Fernie",
    FORTSTJAMES: "Fort St. James",
    FORTSTJOHN: "Fort St. John",
    FORTWARE: "Fort Ware (Kwadacha)",
    FRASERLAKE: "Fraser Lake",
    GANGES: "Ganges",
    GOLDEN: "Golden",
    GOLDRIVER: "Gold River",
    GOODHOPELAKE: "Good Hope Lake",
    GRANDFORKS: "Grand Forks",
    HAZELTON: "Hazelton",
    HOUSTON: "Houston",
    HUDSONSHOPE: "Hudson's Hope",
    INVERMERE: "Invermere",
    KAMLOOPS: "Kamloops",
    KELOWNA: "KELOWNA",
    KITIMAT: "Kitimat",
    KLEMTU: "Klemtu",
    LILLOOET: "Lilloet",
    LOWERPOST: "Lower Post",
    MACKENZIE: "Mackenzie",
    MASSET: "Masset",
    MCBRIDE: "McBride",
    MERRITT: "Merritt",
    NAKUSP: "Nakusp",
    NANAIMO: "Nanaimo",
    NELSON: "Nelson",
    NEWAIYANSH: "New Aiyansh",
    NEWWESTMINSTER: "New Westminster",
    NORTHVANCOUVER: "North Vancouver",
    HUNDREDMILEHOUSE: "100 Mile House",
    PEMBERTON: "Pemberton",
    PENTICTON: "Penticton",
    PORTALBERNI: "Port Alberni",
    PORTCOQUITLAM: "Port Coquitlam",
    PORTHARDY: "Port Hardy",
    POWELLRIVER: "Powell River",
    PRINCEGEORGE: "Prince George",
    PRINCERUPERT: "Prince Rupert",
    PRINCETON: "Princeton",
    QUEENCHARLOTTE: "Queen Charlotte",
    QUESNEL: "Quesnel",
    REVELSTOKE: "Revelstoke",
    RICHMOND: "Richmond",
    ROSSLAND: "Rossland",
    SALMONARM: "Salmon Arm",
    SECHELT: "Sechelt",
    SIDNEY: "Sidney",
    SMITHERS: "Smithers",
    SPARWOOD: "Sparwood",
    STEWART: "Stewart",
    SURREY: "Surrey",
    TAHSIS: "Tahsis",
    TERRACE: "Terrace",
    TOFINO: "Tofino",
    TSAYKEHDENE: "Tsay Keh Dene (Ingenika)",
    TUBLERRIDGE: "Tumbler Ridge",
    UCLULET: "Ucluelet",
    VALEMOUNT: "Valemont",
    VLC: "Vancouver - VLC",
    VANCOUVER: "Vancouver - 222 Main",
    ROBSONSQUARE: "Vancouver - Robson Square",
    VANDERHOOF: "Vanderhoof",
    VERNON: "Vernon",
    VICTORIA: "Victoria",
    WESTERNCOMMUNITIES: "Western Communities",
    WILLIAMSLAKE: "Williams Lake"
}

export const REGIONS: StringMap = {
    FRASER: "Fraser",
    INTERIOR: "Interior",
    NORTHERN: "Northern",
    VANCENTRE: "Van Centre",
    VANISLAND: "Vancouver Island"
}

export interface SheriffTraining {
    trainingType: string;
    certificationDate: string;
    expiryDate: string;
}

export interface SheriffLocation{
    courthouseId: string;
    regionId: string;
}

export interface Sheriff {
    firstName: string;
    lastName: string;
    badgeNumber: number;
    imageUrl?: string;
    abilities?: SheriffAbility;
    training: SheriffTraining[];
    permanentLocation?: SheriffLocation;
    currentLocation?: SheriffLocation;
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
        permanentLocation: { courthouseId: "VANCOUVER", regionId: "VANCENTRE"},
        currentLocation: {courthouseId: "VANCOUVER", regionId: "VANCENTRE"},
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
        permanentLocation: { courthouseId: "KAMLOOPS", regionId: "INTERIOR"},
        currentLocation: {courthouseId: "KAMLOOPS", regionId: "INTERIOR"},
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
        permanentLocation: { courthouseId: "PRINCEGEORGE", regionId: "NORTHERN"},
        currentLocation: {courthouseId: "PRINCEGEORGE", regionId: "NORTHERN"},
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
        permanentLocation: { courthouseId: "NEWWESTMINSTER", regionId: "FRASER"},
        currentLocation: {courthouseId: "NEWWESTMINSTER", regionId: "FRASER"},
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
        permanentLocation: { courthouseId: "SURREY", regionId: "FRASER"},
        currentLocation: {courthouseId: "SURREY", regionId: "FRASER"},
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
        permanentLocation: { courthouseId: "VLC", regionId: "VANCENTRE"},
        currentLocation: {courthouseId: "VLC", regionId: "VANCENTRE"},
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
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 1,
        assignmentType: ASSIGNMENT_TYPES.escortServices,
        pickupLocation: 'Location Z',
        dropoffLocation: 'Courthouse A',
        notes: 'My notes on this escort.',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [],
        startTime: moment().startOf('day').add(8, 'hours'),
        endTime: moment().startOf('day').add(9, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 2,
        assignmentType: ASSIGNMENT_TYPES.documentServices,
        notes: 'Serve documents A, B, and C',
        requiredAbilities: SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
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
        gateNumber: 1,
        notes: 'My notes on this gate',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12.5, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 5,
        assignmentType: ASSIGNMENT_TYPES.courtSecurity,
        courtRoom: 'Courtroom 102',
        assignmentCourt: false,
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 6,
        assignmentType: ASSIGNMENT_TYPES.courtSecurity,
        courtRoom: 'Courtroom 101',
        assignmentCourt: false,
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(13, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 7,
        assignmentType: ASSIGNMENT_TYPES.courtSecurity,
        courtRoom: 'Courtroom 102',
        assignmentCourt: false,
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(13, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 8,
        assignmentType: ASSIGNMENT_TYPES.gateSecurity,
        gateNumber: 1,
        notes: 'My notes on this gate',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().startOf('day').add(12.5, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 9,
        assignmentType: ASSIGNMENT_TYPES.escortServices,
        pickupLocation: 'Courthouse A',
        dropoffLocation: 'Location Z',
        notes: 'My notes on this escort.',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [],
        startTime: moment().startOf('day').add(16, 'hours'),
        endTime: moment().startOf('day').add(17, 'hours'),
        sherrifsRequired: 1
    },
];

export default new Client();