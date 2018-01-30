import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffOvertimeStatus from './SheriffOvertimeStatus';
import SheriffUpcomingSchedule from './SheriffUpcomingScheduleDetails';
import SheriffTrainingDetails from './SheriffTrainingDetails';
import SheriffLocationDetails from './SheriffLocationDetails';

export interface SheriffProfileDetailsProps {
    sheriff: Sheriff;
}

export default class SheriffProfileDetails extends React.Component<SheriffProfileDetailsProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <SheriffLocationDetails sheriff={ sheriff } />
                <br />
                <SheriffTrainingDetails sheriff={ sheriff } />           
                <br />
                <SheriffUpcomingSchedule sheriff={ sheriff } />
                <br />
                <SheriffOvertimeStatus />
            </div>
        );
    }
}