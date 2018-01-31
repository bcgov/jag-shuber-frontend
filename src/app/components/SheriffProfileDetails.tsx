import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffOvertimeStatus from './SheriffOvertimeStatus';
import SheriffUpcomingSchedule from './SheriffUpcomingScheduleDetails';
import SheriffTrainingDetails from './SheriffTrainingDetails';
import SheriffLocationDetails from './SheriffLocationDetails';
import SheriffDutyStatus from './SheriffDutyStatus';

export interface SheriffProfileDetailsProps {
    sheriff: Sheriff;
    isCompactView?: boolean;
}

export default class SheriffProfileDetails extends React.Component<SheriffProfileDetailsProps, any>{
    render() {
        const { isCompactView, sheriff:{onDuty, training, currentLocation, permanentLocation} } = this.props;
        return (
            <div>
                <SheriffLocationDetails 
                    currentLocation={currentLocation} 
                    permanentLocation={permanentLocation}  
                />
                <br />
                <SheriffTrainingDetails training={ training } isCompactView={isCompactView}/>           
                <br />
                {!isCompactView && <SheriffUpcomingSchedule onDuty={ onDuty } /> }
                {isCompactView && <SheriffDutyStatus onDuty ={ onDuty } />}
                <br />
                {!isCompactView && <SheriffOvertimeStatus />}
            </div>
        );
    }
}