import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { visibleTime } from '../modules/dutyRoster/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/dutyRoster/actions';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import DutyRosterToolsModal from './DutyRosterToolsModal';
import DateRangeControls from '../components/DateRangeControls';

interface DutyRosterControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface DutyRosterControlsProps {
}

interface DutyRosterDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
}

class DutyRosterControls extends React.PureComponent<
    DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDistpatchProps> {

    render() {
        const { visibleTimeStart, visibleTimeEnd, updateVisibleTime } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <div className="toolbar-calendar-control">
                    <DateRangeControls
                        defaultDate={moment(visibleTimeStart)}
                        onNext={() => updateVisibleTime(
                            moment(visibleTimeStart).add('day', 1),
                            moment(visibleTimeEnd).add('day', 1)
                        )}
                        onPrevious={() => updateVisibleTime(
                            moment(visibleTimeStart).subtract('day', 1),
                            moment(visibleTimeEnd).subtract('day', 1)
                        )}
                        onSelect={(selectedDate) => updateVisibleTime(
                            TimeUtils.getDefaultStartTime(moment(selectedDate)),
                            TimeUtils.getDefaultEndTime(moment(selectedDate))
                        )}
                        onToday={() => updateVisibleTime(
                            TimeUtils.getDefaultStartTime(),
                            TimeUtils.getDefaultEndTime()
                        )}
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
    updateVisibleTime: setVisibleTime
};

// tslint:disable-next-line:max-line-length
export default connect<DutyRosterControlsStateProps, DutyRosterDistpatchProps, DutyRosterControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(DutyRosterControls);