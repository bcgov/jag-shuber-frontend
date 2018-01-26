import * as React from 'react';
import { Sheriff } from '../api/index';
import ScheduleSummary from './ScheduleSummaryView';
import WorksiteDetailsView from './WorksiteDetailsView';
import TrainingDetailsView from './TrainingDetailsView';

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