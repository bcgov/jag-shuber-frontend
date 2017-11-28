import {default as API,sheriffs as Data} from "../index";

describe('API Client',()=>{

    beforeEach(()=>{
      console.log("before api test")  
    });

    afterEach(()=>{
        console.log('Cleanup')
    });


    it('Should return sheriffs',async ()=>{
        let sheriffs = await API.getSheriffs();
        expect(sheriffs).toBeDefined();
        expect(Array.isArray(sheriffs)).toBeTruthy();
        let s = sheriffs[0];
        expect(s).toMatchObject(Data[0]);
    })

})

