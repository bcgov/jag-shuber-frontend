// import * as moment from 'moment';
import { 
    Shift 
} from '../api/Api';
import { ShiftCreationPayload } from '../modules/shifts/actions';

export function createShiftsFromShiftCreatorPayload (shiftInfo: ShiftCreationPayload): Partial<Shift>[] {
    let partialShifts: Partial<Shift>[] = []; 
    // const {startTime, endTime} = shiftInfo;
    //         const startMoment = moment(startTime);
    //         const startHour = startMoment.hour();
    //         const startMinute = startMoment.minute();
            
    //         const endMoment = moment(endTime);
    //         const endHour = endMoment.hour();
    //         const endMinute = endMoment.minute();

    return partialShifts;
}