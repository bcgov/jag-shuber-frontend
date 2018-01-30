import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffOvertimeView from './SheriffOvertimeView';
import SheriffUpcomingSchedule from './SheriffUpcomingScheduleView';
import SheriffTrainingView from './SheriffTrainingView';
import SheriffWorksiteDetailsView from './SheriffWorksiteDetailsView';

export interface SheriffProfileViewProps {
    sheriff: Sheriff;
}

export default class SheriffProfileView extends React.Component<SheriffProfileViewProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <SheriffWorksiteDetailsView sheriff={ sheriff } />
                <br />
                <SheriffTrainingView sheriff={ sheriff } />           
                <br />
                <SheriffUpcomingSchedule sheriff={ sheriff } />
                <br />
                <SheriffOvertimeView />
            </div>
        );
    }
}