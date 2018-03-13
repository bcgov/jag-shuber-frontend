import * as React from 'react';
import { DaysOfWeek } from '../api/Api';

export interface ScheduleSummaryProps {
    daysToDisplay?: DaysOfWeek;
}

export default class ScheduleSummary extends React.PureComponent<ScheduleSummaryProps, any> {

    render() {
        const {
            daysToDisplay = DaysOfWeek.Everyday
        } = this.props;
        const days = DaysOfWeek.getDisplayValues(daysToDisplay);
        return (
            <div>
                {days}
            </div>
        );
    }
}
