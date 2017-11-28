
export function delay(ms:number):Promise<void>{
    // let ctr:any;
    // let rej:any;
    return new Promise(r=>setTimeout(r,ms));
    // const p = new Promise((resolve:()=>void,reject:(msg:string)=>void)=>{
    //     ctr = setTimeout(resolve,ms);
    //     rej = reject;
    // });
    // p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
    // return p;
}



export function randomDelay(minMs=10,maxMs=500):Promise<void>{
    const delayMs = Math.random()*(maxMs-minMs)+minMs;
    return delay(delayMs);
}
