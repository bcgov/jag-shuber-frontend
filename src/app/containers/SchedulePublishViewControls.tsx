import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    publishViewVisibleWeek,
    isShowWorkSections
} from '../modules/schedule/selectors';
import {
    updateDeputyViewWeekStart,
    updateShowWorkSections as updateShowWorkSectionsAction
} from '../modules/schedule/actions';
import { TimeType } from '../api';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import Toggle from '../components/Toggle/Toggle';
import DateRangeControls from '../components/DateRangeControls';

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
                    <Toggle
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
                <div>
                    <DateRangeControls 
                        defaultDate={moment(weekStart)}
                        onNext={() => updateVisibleWeek(moment(weekStart).add('week', 1))}
                        onPrevious={() => updateVisibleWeek(moment(weekStart).subtract('week', 1))}
                        onSelect={(selectedDate) => updateVisibleWeek(moment(selectedDate).startOf('week'))}
                        onToday={() => updateVisibleWeek(moment().startOf('week'))}
                    />
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
    updateShowWorkSections: updateShowWorkSectionsAction
};

// tslint:disable-next-line:max-line-length
export default connect<SchedulePublishViewControlsStateProps, SchedulePublishViewControlsDispatchProps, SchedulePublishViewControlsProps>(
    mapStateToProps, mapDispatchToProps)(SchedulePublishViewControls);