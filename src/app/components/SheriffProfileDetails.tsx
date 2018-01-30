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
        const { sheriff:{onDuty, training, currentCourthouse, currentRegion, permanentCourthouse, permanentRegion} } = this.props;
        return (
            <div>
                <SheriffLocationDetails 
                    currentCourthouse={currentCourthouse} 
                    currentRegion={currentRegion} 
                    permanentCourthouse={permanentCourthouse} 
                    permanentRegion={permanentRegion} 
                />
                <br />
                <SheriffTrainingDetails training={ training } />           
                <br />
                <SheriffUpcomingSchedule onDuty={ onDuty } />
                <br />
                <SheriffOvertimeStatus />
            </div>
        );
    }
}