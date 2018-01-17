import * as React from 'react';
import { Sheriff } from '../../../api/index';
import ScheduleSummary from '../../schedule/components/ScheduleSummaryView';
import WorksiteDetailsView from '../../worksite/components/WorksiteDetailsView';
import TrainingDetailsView from '../../training/components/TrainingDetailsView';

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
                <ScheduleSummary sheriff ={ sheriff } />
                <br /><br/>
                <TrainingDetailsView sheriff={ sheriff } isLimited />

            </div>
        );
    }
}