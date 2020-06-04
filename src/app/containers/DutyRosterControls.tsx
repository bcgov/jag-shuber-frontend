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

interface DutyRosterControlsProps {
}

interface DutyRosterDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    fetchSheriffs: (dateRange?: DateRange) => void;
}

class DutyRosterControls extends React.PureComponent<
    DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDistpatchProps> {

    render() {
        const { visibleTimeStart, visibleTimeEnd, updateVisibleTime, fetchSheriffs } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <div className="toolbar-calendar-control">
                    <DateRangeControls
                        defaultDate={moment(visibleTimeStart)}
                        onNext={async () => {
                            const dateRange = { startDate: visibleTimeStart, endDate: visibleTimeEnd };
                            await fetchSheriffs(dateRange);

                            updateVisibleTime(
                                moment(visibleTimeStart).add('day', 1),
                                moment(visibleTimeEnd).add('day', 1)
                            );
                        }}
                        onPrevious={async () => {
                            const dateRange = { startDate: visibleTimeStart, endDate: visibleTimeEnd };
                            await fetchSheriffs(dateRange);

                            updateVisibleTime(
                                moment(visibleTimeStart).subtract('day', 1),
                                moment(visibleTimeEnd).subtract('day', 1)
                            );
                        }}
                        onSelect={async (selectedDate) => {
                            const dateRange = { startDate: visibleTimeStart, endDate: visibleTimeEnd };
                            await fetchSheriffs(dateRange);

                            updateVisibleTime(
                                TimeUtils.getDefaultStartTime(moment(selectedDate)),
                                TimeUtils.getDefaultEndTime(moment(selectedDate))
                            );
                        }}
                        onToday={async () => {
                            const dateRange = { startDate: visibleTimeStart, endDate: visibleTimeEnd };
                            await fetchSheriffs(dateRange);

                            updateVisibleTime(
                                TimeUtils.getDefaultStartTime(),
                                TimeUtils.getDefaultEndTime()
                            );
                        }}
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
export default connect<DutyRosterControlsStateProps, DutyRosterDistpatchProps, DutyRosterControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(DutyRosterControls);
