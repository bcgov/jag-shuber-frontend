import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    publishViewVisibleWeek,
    isShowWorkSections
} from '../modules/schedule/selectors';
import {
    updateDeputyViewWeekStart,
    updateShowWorkSections
} from '../modules/schedule/actions';
import { TimeType } from '../api';
import CalendarButton from '../components/CalendarButton/CalendarButton';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ToggleField from '../components/ToggleField/ToggleField';

interface SchedulePublishViewControlsProps {
}

interface SchedulePublishViewControlsDispatchProps {
    updateVisibleWeek: (weekStart: any) => void;
    updateShowWorkSections: (show: boolean) => void;
}

interface SchedulePublishViewControlsStateProps {
    weekStart?: TimeType;
    includeWorkSection?: boolean;
}

class SchedulePublishViewControls extends React.Component<SchedulePublishViewControlsProps
    & SchedulePublishViewControlsDispatchProps
    & SchedulePublishViewControlsStateProps> {

    render() {
        const {
            updateVisibleWeek,
            weekStart = moment().startOf('week').toISOString(),
            includeWorkSection = true,
            // tslint:disable-next-line:no-shadowed-variable
            updateShowWorkSections
        } = this.props;
        return (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row-reverse',
                    marginRight: '10%'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <span title="Display Work Section">
                    <ToggleField
                        defaultChecked={includeWorkSection}
                        onChange={() => updateShowWorkSections(!includeWorkSection)}
                        checkedLabel={<span style={{ color: 'white'}}>WS</span>}
                        uncheckedLabel={<span style={{ color: 'white'}}>WS</span>}
                    />
                    </span>
                    <Button
                        bsStyle="link"
                        bsSize="large"
                        style={{ color: 'white' }}
                        onClick={() => window.print()}
                    >
                        <Glyphicon glyph="print" />
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 5}}>
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
            </div>
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        weekStart: publishViewVisibleWeek(state),
        includeWorkSection: isShowWorkSections(state)
    };
};

const mapDispatchToProps = {
    updateVisibleWeek: updateDeputyViewWeekStart,
    updateShowWorkSections: updateShowWorkSections
};

// tslint:disable-next-line:max-line-length
export default connect<SchedulePublishViewControlsStateProps, SchedulePublishViewControlsDispatchProps, SchedulePublishViewControlsProps>(
    mapStateToProps, mapDispatchToProps)(SchedulePublishViewControls);