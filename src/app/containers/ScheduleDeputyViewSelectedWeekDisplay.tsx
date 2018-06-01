import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { deputyViewVisibleWeek } from '../modules/schedule/selectors';
import { TimeType } from '../api';

interface ScheduleDeputyViewSelectedWeekDisplayProps {
}

interface ScheduleDeputyViewSelectedWeekDisplayDispatchProps {
}

interface ScheduleDeputyViewSelectedWeekDisplayStateProps {
    weekStart?: TimeType;
}

class ScheduleDeputyViewSelectedWeekDisplay extends React.Component<ScheduleDeputyViewSelectedWeekDisplayProps
    & ScheduleDeputyViewSelectedWeekDisplayDispatchProps
    & ScheduleDeputyViewSelectedWeekDisplayStateProps> {

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
        weekStart: deputyViewVisibleWeek(state)
    };
};

const mapDispatchToProps = {
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleDeputyViewSelectedWeekDisplayStateProps, ScheduleDeputyViewSelectedWeekDisplayDispatchProps, ScheduleDeputyViewSelectedWeekDisplayProps>(
    mapStateToProps, mapDispatchToProps)(ScheduleDeputyViewSelectedWeekDisplay);