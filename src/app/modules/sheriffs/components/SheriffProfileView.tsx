import * as React from 'react';
import { Sheriff } from '../../../api/index';
import OvertimeDetails from '../../overtime/components/OvertimeDetailsView';
import UpcomingScheduleView from '../../schedule/components/UpcomingScheduleView';
import TrainingDetailsView from '../../training/components/TrainingDetailsView';
import WorksiteDetailsView from '../../worksite/components/WorksiteDetailsView';

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