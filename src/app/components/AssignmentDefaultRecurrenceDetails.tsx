import * as React from 'react';
import {
    RecurrenceInfo,
    DaysOfWeek
} from '../api';
import { Badge } from 'react-bootstrap';

export interface AssignmentDefaultRecurrenceDetailsProps {
    data: RecurrenceInfo;
}

export default class AssignmentDefaultRecurrenceDetails 
    extends React.PureComponent<AssignmentDefaultRecurrenceDetailsProps, any> {
    
    render() {
        const { data: { daysBitmap, startTime, endTime, sheriffsRequired } } = this.props; 
        const dayDisplay = DaysOfWeek.getDisplayValues(daysBitmap).join(', ');
        const startTimeString = startTime.toString();
        const endTimeString = endTime.toString();

        return (
            <div>
                <strong>{dayDisplay}</strong> - {startTimeString.substr(0, startTimeString.length - 3)} to {endTimeString.substr(0, endTimeString.length - 3)}{' '}
                <Badge>{sheriffsRequired}</Badge>
                <br />
            </div>
        );
    }
}
