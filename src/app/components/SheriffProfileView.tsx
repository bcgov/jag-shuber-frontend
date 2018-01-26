import * as React from 'react';
import { Sheriff } from '../api/index';
import OvertimeDetails from './OvertimeDetailsView';
import UpcomingScheduleView from './UpcomingScheduleView';
import TrainingDetailsView from './TrainingDetailsView';
import WorksiteDetailsView from './WorksiteDetailsView';

export interface SheriffProfileViewProps {
    sheriff: Sheriff;
}

export default class SheriffProfileView extends React.Component<SheriffProfileViewProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <WorksiteDetailsView sheriff={ sheriff } />
                <br />
                <TrainingDetailsView sheriff={ sheriff } />           
                <br />
                <UpcomingScheduleView sheriff={ sheriff } />
                <br />
                <OvertimeDetails />
            </div>
        );
    }
}