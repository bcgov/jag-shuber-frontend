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

        return (
            <div>
                <strong>{dayDisplay}</strong> - {startTime} to {endTime}{' '}
                <Badge>{sheriffsRequired}</Badge>
                <br />
            </div>
        );
    }
}
