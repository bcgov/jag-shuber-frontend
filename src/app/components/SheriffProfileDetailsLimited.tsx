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
        const { sheriff, sheriff:{onDuty} } = this.props;
        return (
            <div>
                <SheriffLocationDetails sheriff={ sheriff } />
                <br />
                <SheriffDutyStatus onDuty ={ onDuty } />
                <br /><br/>
                <SheriffTrainingDetails sheriff={ sheriff } isSummary />

            </div>
        );
    }
}