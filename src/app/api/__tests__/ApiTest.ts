import {default as API} from "../index";
import { DaysOfWeek } from "../Api";
 
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
        //expect(Array.isArray(sheriffs)).toBeTruthy();
        // let s = sheriffs[0];
        // expect(s).toMatchObject(Data[0]);
    })

})

describe('DaysOfWeek.getDisplayValues', () => {
    const util = DaysOfWeek.getDisplayValues;
    
    it('Should return each day if weekdays and Sat or Sun is selected', () => {
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sat)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sun)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sun"]);
    }) 
    
    it('Should return each day if weekdays and Sat and Sun is selected', () => {
        expect(util(DaysOfWeek.Weekdays | DaysOfWeek.Sat | DaysOfWeek.Sun)).toEqual(["Everyday"]);
    })

    it('Should return each day if not all weekdays or everyday are selected', () => {
        expect(util(DaysOfWeek.Mon | DaysOfWeek.Tue | DaysOfWeek.Sat | DaysOfWeek.Sun)).toEqual(["Mon", "Tue", "Sat", "Sun"]);
    })

});

