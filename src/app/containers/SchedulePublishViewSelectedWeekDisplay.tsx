import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { publishViewVisibleWeek } from '../modules/schedule/selectors';
import { TimeType } from '../api';

interface SchedulePublishViewSelectedWeekDisplayProps {
}

interface SchedulePublishViewSelectedWeekDisplayDispatchProps {
}

interface SchedulePublishViewSelectedWeekDisplayStateProps {
    weekStart?: TimeType;
}

class SchedulePublishViewSelectedWeekDisplay extends React.Component<SchedulePublishViewSelectedWeekDisplayProps
    & SchedulePublishViewSelectedWeekDisplayDispatchProps
    & SchedulePublishViewSelectedWeekDisplayStateProps> {

    render() {
        const { weekStart = moment().startOf('week').toISOString() } = this.props;
        const weekDisplayed = 
            `${moment(weekStart).format('MMMM D, YYYY')} - ${moment(weekStart).endOf('week').format('MMMM D, YYYY')}`;
        return (
            <span>{weekDisplayed}</span>
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        weekStart: publishViewVisibleWeek(state)
    };
};

const mapDispatchToProps = {
};

// tslint:disable-next-line:max-line-length
export default connect<SchedulePublishViewSelectedWeekDisplayStateProps, SchedulePublishViewSelectedWeekDisplayDispatchProps, SchedulePublishViewSelectedWeekDisplayProps>(
    mapStateToProps, mapDispatchToProps)(SchedulePublishViewSelectedWeekDisplay);