import { 
    StringMap, 
    Sheriff, 
    SheriffAssignment, 
    SheriffAbility, 
    SheriffAssignmentTemplate, 
    DEFAULT_RECURRENCE 
} from "../Api";
import * as moment from 'moment';

export const TRAINING_TYPES: StringMap = {
    FRO: "FRO - Forced Response Option",
    PISTOL: "PISTOL",
    CID: "CID - Critical Incident De-Escalation",
    CEW: "CEW - Conductive Energy Weapon"
}

export const ASSIGNMENT_TYPES = {
    courtSecurity: "Court Security",
    documentServices: "Document Services",
    escortServices: "Escort Services",
    gateSecurity: "Gate Security",
    other: "Other"
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

export const WORK_SECTIONS: StringMap = {
    COURTS: "Courts",
    JAIL: "Jail",
    ESCORTS: "Escorts",
    DOCUMENTS: "Documents",
    GATES: "Gates",
    OTHER: "Other"
}

export const COURTROOMS: StringMap = {
    101: "Courtroom 101",
    102: "Courtroom 102",
    103: "Courtroom 103",
    104: "Courtroom 104",
    201: "Courtroom 201",
    202: "Courtroom 202",
    203: "Courtroom 203",
    204: "Courtroom 204"
}

export const sheriffList: Sheriff[] = [
    {
        firstName: "Garfield",
        lastName: "Shirley",
        badgeNumber: 969,
        imageUrl: '/img/garfield_shirley.jpg',
        permanentLocation: { courthouseId: "VANCOUVER", regionId: "VANCENTRE" },
        currentLocation: { courthouseId: "VANCOUVER", regionId: "VANCENTRE" },
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
        permanentLocation: { courthouseId: "KAMLOOPS", regionId: "INTERIOR" },
        currentLocation: { courthouseId: "KAMLOOPS", regionId: "INTERIOR" },
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
        permanentLocation: { courthouseId: "PRINCEGEORGE", regionId: "NORTHERN" },
        currentLocation: { courthouseId: "PRINCEGEORGE", regionId: "NORTHERN" },
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
        permanentLocation: { courthouseId: "NEWWESTMINSTER", regionId: "FRASER" },
        currentLocation: { courthouseId: "NEWWESTMINSTER", regionId: "FRASER" },
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
        permanentLocation: { courthouseId: "SURREY", regionId: "FRASER" },
        currentLocation: { courthouseId: "SURREY", regionId: "FRASER" },
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
        permanentLocation: { courthouseId: "VLC", regionId: "VANCENTRE" },
        currentLocation: { courthouseId: "VLC", regionId: "VANCENTRE" },
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

export const assignments: SheriffAssignment[] = [
    {
        id: 0,
        title: COURTROOMS[101],
        workSectionId: 'COURTS',
        assignmentCourt: true,
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 1,
        title: 'Escorts',
        workSectionId: 'ESCORTS',
        pickupLocation: 'Location Z',
        dropoffLocation: 'Courthouse A',
        notes: 'My notes on this escort.',
        sheriffIds: [],
        startTime: moment().startOf('day').add(8, 'hours'),
        endTime: moment().startOf('day').add(9, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 2,
        title: 'Document Service',
        workSectionId: 'DOCUMENTS',
        notes: 'Serve documents A, B, and C',
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 3,
        title: 'Gate Secturity',
        workSectionId: 'GATES',
        gateNumber: 1,
        notes: 'My notes on this gate',
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12.5, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 4,
        title: COURTROOMS[102],
        workSectionId: 'COURTS',
        assignmentCourt: false,
        sheriffIds: [],
        startTime: moment().startOf('day').add(9, 'hours'),
        endTime: moment().startOf('day').add(12, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 5,
        title: COURTROOMS[103],
        workSectionId: 'COURTS',
        assignmentCourt: false,
        sheriffIds: [],
        startTime: moment().startOf('day').add(13, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 6,
        title: COURTROOMS[104],
        workSectionId: 'COURTS',
        assignmentCourt: false,
        sheriffIds: [],
        startTime: moment().startOf('day').add(13, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1,
        notes: 'My notes on the file.'
    },
    {
        id: 7,
        title: 'Gate Secturity',
        workSectionId: 'GATES',
        gateNumber: 1,
        notes: 'My notes on this gate',
        sheriffIds: [],
        startTime: moment().startOf('day').add(12.5, 'hours'),
        endTime: moment().startOf('day').add(16, 'hours'),
        sherrifsRequired: 1
    },
    {
        id: 8,
        title: 'Escorts',
        workSectionId: 'ESCORTS',
        pickupLocation: 'Courthouse A',
        dropoffLocation: 'Location Z',
        notes: 'My notes on this escort.',
        sheriffIds: [],
        startTime: moment().startOf('day').add(16, 'hours'),
        endTime: moment().startOf('day').add(17, 'hours'),
        sherrifsRequired: 1
    },
];

export const defaultAssignmentTemplates: SheriffAssignmentTemplate[] = [
    {
        id: 0,
        assignment: {
            id: 0,
            title: COURTROOMS[101],
            sherrifsRequired: 1,
            courtroomId: 101,
            workSectionId: 'COURTS'
        },
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 1,
        assignment: {
            id: 1,
            title: COURTROOMS[102],
            sherrifsRequired: 1,
            courtroomId: 102,
            workSectionId: 'COURTS'
        },
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 2,
        assignment: {
            id: 2,
            title: COURTROOMS[103],
            sherrifsRequired: 1,
            courtroomId: 103,
            workSectionId: 'COURTS'
        },
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 3,
        assignment: {
            id: 3,
            title: COURTROOMS[104],
            sherrifsRequired: 1,
            courtroomId: 104,
            workSectionId: 'COURTS'
        },
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    }
];