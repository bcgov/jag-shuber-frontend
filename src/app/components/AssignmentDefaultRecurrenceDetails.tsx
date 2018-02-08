import * as React from 'react';
import * as EnumUtils from '../infrastructure/EnumUtils';
import { 
    RecurrenceInfo,
    DaysOfWeek 
} from '../api';
import DateDisplay from './DateDisplay';


export interface AssignmentDefaultRecurrenceDetailsProps {
    data: RecurrenceInfo;
}

export default class AssignmentDefaultRecurrenceDetails extends React.PureComponent<AssignmentDefaultRecurrenceDetailsProps, any> {
    render() {
        const { data } = this.props;
        const days = EnumUtils.displayEnum(DaysOfWeek, data.days).join(", ");
        
        return (
            <div>
                <strong>{days}</strong> - <DateDisplay date={data.startTime} showTime /> to <DateDisplay date={data.endTime} showTime /> <br />
            </div>
        );
    }
}
