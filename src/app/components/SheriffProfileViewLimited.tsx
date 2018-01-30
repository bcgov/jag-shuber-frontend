import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffScheduleStatus from './SheriffScheduleStatus';
import SheriffWorksiteDetailsView from './SheriffWorksiteDetailsView';
import SheriffTrainingDetailsView from './SheriffTrainingView';

export interface SheriffProfileViewPropsLimited {
    sheriff: Sheriff;
}

export default class SheriffProfileViewLimited extends React.Component<SheriffProfileViewPropsLimited, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <SheriffWorksiteDetailsView sheriff={ sheriff } />
                <br />
                <SheriffScheduleStatus sheriff ={ sheriff } />
                <br /><br/>
                <SheriffTrainingDetailsView sheriff={ sheriff } isSummary />

            </div>
        );
    }
}