import * as React from 'react';
import { Sheriff } from '../../../api/index';
import UpcomingScheduleView from '../../schedule/components/UpcomingScheduleView';
import WorksiteDetailsView from '../../worksite/components/WorksiteDetailsView';

export interface LimitedSheriffProfileViewProps {
    sheriff: Sheriff;
}

export default class LimitedSheriffProfileView extends React.Component<LimitedSheriffProfileViewProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <WorksiteDetailsView sheriff={ sheriff } />
                
                <br />

                <UpcomingScheduleView />
            </div>
        );
    }
}