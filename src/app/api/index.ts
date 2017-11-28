// import {randomDelay} from './PromiseExtensions'

export enum SheriffAbility{
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}


export interface Sheriff{
    name:string
    badgeNumber:number
    imageUrl:string
    abilities:SheriffAbility
}

export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface Location {
    street: string;
    city: string;
    state: string;
    postcode: any;
}

export interface Login {
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface Id {
    name: string;
    value: string;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface ApiPerson {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: string;
    registered: string;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
}

export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface APIPeopleResponse {
    results: ApiPerson[];
    info: Info;
}

export interface API{
    getSheriffs():Promise<Sheriff[]>;
}







class Client implements API{
    private static peopleUrl="https://randomuser.me/api/?seed=shuber&results=10&nat=us";


    async getSheriffs():Promise<Sheriff[]>{
        let response = await fetch(Client.peopleUrl,{method:'GET'});
        let body :APIPeopleResponse  = await response.json();
        
        let badgeNumber = 0;
        return body.results.map(p=>{
            
            let s:Sheriff = {
                name:`${p.name.first} ${p.name.last}`,
                badgeNumber:badgeNumber++,
                imageUrl:p.picture.large,
                abilities:SheriffAbility.All
            };
            return s;
        });      
    }  

}

export default new Client();