import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { deputyViewVisibleWeek } from '../modules/schedule/selectors';
import { updateDeputyViewWeekStart } from '../modules/schedule/actions';
import { TimeType } from '../api';
import CalendarButton from '../components/CalendarButton/CalendarButton';
import { 
    Button,
    Glyphicon
} from 'react-bootstrap';

interface ScheduleDeputyViewControlsProps {
    includeWorkSection?: boolean;
}

interface ScheduleDeputyViewControlsDispatchProps {
    updateVisibleWeek: (weekStart: any) => void;
}

interface ScheduleDeputyViewControlsStateProps {
    weekStart?: TimeType;
}

class ScheduleDeputyViewControls extends React.Component<ScheduleDeputyViewControlsProps
    & ScheduleDeputyViewControlsDispatchProps
    & ScheduleDeputyViewControlsStateProps> {

    render() {
        const { updateVisibleWeek, weekStart = moment().startOf('week').toISOString() } = this.props;
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Button
                    onClick={() => updateVisibleWeek(
                        moment(weekStart).subtract('week', 1)
                    )}
                    bsStyle="link"
                    bsSize="large"
                    style={{ color: 'white' }}
                >
                    <Glyphicon glyph="chevron-left" />
                </Button>
                <CalendarButton
                    onChange={(selectedDate) => updateVisibleWeek(
                        moment(selectedDate).startOf('week')
                    )}
                    defaultValue={moment(weekStart)}
                    todayOnClick={() => updateVisibleWeek(
                        moment().startOf('week')
                    )}
                />
                <Button
                    onClick={() => updateVisibleWeek(
                        moment(weekStart).add('week', 1)
                    )}
                    bsStyle="link"
                    bsSize="large"
                    style={{ color: 'white' }}
                >
                    <Glyphicon glyph="chevron-right" />
                </Button>
            </div>
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        weekStart: deputyViewVisibleWeek(state)
    };
};

const mapDispatchToProps = {
    updateVisibleWeek: updateDeputyViewWeekStart
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleDeputyViewControlsStateProps, ScheduleDeputyViewControlsDispatchProps, ScheduleDeputyViewControlsProps>(
    mapStateToProps, mapDispatchToProps)(ScheduleDeputyViewControls);