import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffDutyStatus from './SheriffDutyStatus';
import SheriffLocationDetails from './SheriffLocationDetails';
import SheriffTrainingDetails from './SheriffTrainingDetails';

export interface SheriffProfileDetailsLimitedProps {
    sheriff: Sheriff;
}

export default class SheriffProfileDetailsimited extends React.Component<SheriffProfileDetailsLimitedProps, any>{
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
                <SheriffDutyStatus onDuty ={ onDuty } />
                <br /><br/>
                <SheriffTrainingDetails training ={ training } isSummary />

            </div>
        );
    }
}