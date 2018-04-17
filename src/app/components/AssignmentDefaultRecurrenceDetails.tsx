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
        getTimeDisplay(timeString: string) {
            return timeString.substr(0, timeString.lastIndexOf(':'));
        }
    
        render() {
        const { data: { daysBitmap, startTime, endTime, sheriffsRequired } } = this.props; 
        const dayDisplay = DaysOfWeek.getDisplayValues(daysBitmap).join(', ');
        const startTimeString = this.getTimeDisplay(startTime.toString());
        const endTimeString = this.getTimeDisplay(endTime.toString());

        return (
            <div>
                <strong>{dayDisplay}</strong> - {startTimeString} to {endTimeString}{' '}
                <Badge>{sheriffsRequired}</Badge>
                <br />
            </div>
        );
    }
}
