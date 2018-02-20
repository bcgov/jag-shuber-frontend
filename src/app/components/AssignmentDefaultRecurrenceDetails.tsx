import * as React from 'react';
import * as EnumUtils from '../infrastructure/EnumUtils';
import {
    RecurrenceInfo,
    DaysOfWeek
} from '../api';
import DateDisplay from './DateDisplay';
import { Badge } from 'react-bootstrap';


export interface AssignmentDefaultRecurrenceDetailsProps {
    data: RecurrenceInfo;
}

export default class AssignmentDefaultRecurrenceDetails extends React.PureComponent<AssignmentDefaultRecurrenceDetailsProps, any> {
    render() {
        const { data: { days, startTime, endTime, sheriffsRequired } } = this.props;
        const dayDisplay = EnumUtils.displayEnum(DaysOfWeek, days).join(", ");

        return (
            <div>
                <strong>{dayDisplay}</strong> - <DateDisplay date={startTime} showTime /> to <DateDisplay date={endTime} showTime /> {' '}
                <Badge>{sheriffsRequired}</Badge>
                <br />
            </div>
        );
    }
}
