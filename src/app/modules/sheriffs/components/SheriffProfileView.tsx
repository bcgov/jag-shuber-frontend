import * as React from 'react';
import { Sheriff } from '../../../api/index';
import OvertimeDetails from '../../overtime/components/OvertimeDetailsView';
import UpcomingScheduleView from '../../schedule/components/UpcomingScheduleView';
import TrainingDetailsView from '../../training/components/TrainingDetailsView';
import WorksiteDetailsView from '../../worksite/components/WorksiteDetailsView';

export interface SheriffProfileProps {
    sheriff: Sheriff;
}

export default class SheriffProfile extends React.Component<SheriffProfileProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <WorksiteDetailsView sheriff={ sheriff } />
                
                <br />

                <TrainingDetailsView sheriff={ sheriff } />
                
                <br />
                
                <UpcomingScheduleView />

                <br />
               
                <OvertimeDetails />
            </div>
        );
    }
}