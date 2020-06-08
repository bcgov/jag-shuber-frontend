import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { visibleTime } from '../modules/dutyRoster/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/dutyRoster/actions';
import { getSheriffList } from '../modules/sheriffs/actions';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import DutyRosterToolsModal from './DutyRosterToolsModal';
import DateRangeControls from '../components/DateRangeControls';
import { DateRange } from '../api/Api';

interface DutyRosterControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface DutyRosterDispatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    fetchSheriffs: (dateRange?: DateRange) => void;
}

interface DutyRosterControlsProps {}

class DutyRosterControls
    extends React.PureComponent<
        DutyRosterControlsProps &
        DutyRosterControlsStateProps &
        DutyRosterDispatchProps> {

    constructor(props: DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDispatchProps) {
        super(props);

        this.onPrevious = this.onPrevious.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onToday = this.onToday.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillReceiveProps(
        nextProps: DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDispatchProps,
        nextContext: any
    ): void {
        const {
            visibleTimeStart,
            visibleTimeEnd,
            fetchSheriffs
        } = this.props;

        if (nextProps.visibleTimeStart !== visibleTimeStart || nextProps.visibleTimeEnd !== visibleTimeEnd) {
            const dateRange = { startDate: nextProps.visibleTimeStart, endDate: nextProps.visibleTimeEnd };
            fetchSheriffs(dateRange);
        }
    }

    async onPrevious() {
        const {
            visibleTimeStart,
            visibleTimeEnd,
            updateVisibleTime,
        } = this.props;

        updateVisibleTime(
            moment(visibleTimeStart).subtract('week', 1),
            moment(visibleTimeEnd).subtract('week', 1)
        );
    }

    async onNext() {
        const {
            visibleTimeStart,
            visibleTimeEnd,
            updateVisibleTime,
        } = this.props;

        updateVisibleTime(
            moment(visibleTimeStart).add('week', 1),
            moment(visibleTimeEnd).add('week', 1)
        );
    }

    async onSelect(selectedDate: any) {
        const {
            updateVisibleTime,
        } = this.props;

        updateVisibleTime(
            moment(selectedDate).startOf('week').add(1, 'day'),
            moment(selectedDate).endOf('week').subtract(1, 'day')
        );
    }

    async onToday() {
        const {
            updateVisibleTime
        } = this.props;

        updateVisibleTime(
            moment().startOf('week').add(1, 'day'),
            moment().endOf('week').subtract(1, 'day')
        );
    }

    render() {
        const { visibleTimeStart } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <div className="toolbar-calendar-control">
                    <DateRangeControls
                        defaultDate={moment(visibleTimeStart)}
                        onNext={this.onNext}
                        onPrevious={this.onPrevious}
                        onSelect={this.onSelect}
                        onToday={this.onToday}
                    />
                </div>
                <div style={{ position: 'absolute', right: 2 }}>
                    <div className="btn">
                        <DutyRosterToolsModal.ShowButton date={visibleTimeStart} />
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return visibleTime(state);
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime,
    fetchSheriffs: getSheriffList
};

// tslint:disable-next-line:max-line-length
export default connect<DutyRosterControlsStateProps, DutyRosterDispatchProps, DutyRosterControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(DutyRosterControls);
