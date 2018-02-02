import * as React from 'react';
import * as EnumUtils from '../infrastructure/EnumUtils';
import { 
    RecurrenceInfo,
    DaysOfWeek 
} from '../api';


export interface AssignmentDefaultRecurrenceDetailsProps {
    data: RecurrenceInfo;
}

export default class AssignmentDefaultRecurrenceDetails extends React.PureComponent<AssignmentDefaultRecurrenceDetailsProps, any> {
    render() {
        const { data } = this.props;
        const days = EnumUtils.displayEnum(DaysOfWeek, data.days).join(", ");
        
        return (
            <div>
                <strong>{days}</strong> - {data.startTime} to {data.endTime} <br />
            </div>
        );
    }
}
