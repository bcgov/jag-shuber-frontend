import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import { visibleTime } from '../modules/schedule/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/schedule/actions';
import CalendarButton from '../components/FormElements/CalendarButton/CalendarButton';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import ScheduleShiftAddModal from './ScheduleShiftAddModal';
import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';
// import ImportDefaultDutiesModal from '../containers/ImportDefaultDutiesModal';

interface ScheduleControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface ScheduleControlsProps {
}

interface ScheduleDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
}

class ScheduleControls extends React.PureComponent<
    ScheduleControlsProps & ScheduleControlsStateProps & ScheduleDistpatchProps> {

    render() {
        const { visibleTimeStart, visibleTimeEnd, updateVisibleTime } = this.props;
        return (
            
            <div style={{ textAlign: 'center', display: 'flex'}}>
                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).subtract('day', 1),
                        moment(visibleTimeEnd).subtract('day', 1)
                    )}
                    bsStyle="link" 
                    bsSize="large" 
                    style={{color: 'white'}}
                >
                    <Glyphicon glyph="chevron-left" />
                </Button>
                
                <CalendarButton 
                    onChange={(selectedDate) => updateVisibleTime(
                        TimeUtils.getDefaultStartTime(moment(selectedDate)),
                        TimeUtils.getDefaultEndTime(moment(selectedDate))
                    )}
                    defaultValue={visibleTimeStart}
                    todayOnClick={() => updateVisibleTime(
                        TimeUtils.getDefaultStartTime(),
                        TimeUtils.getDefaultEndTime()
                    )}
                />

                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).add('day', 1),
                        moment(visibleTimeEnd).add('day', 1)
                    )}
                    bsStyle="link" 
                    bsSize="large" 
                    style={{color: 'white'}}
                >
                    <Glyphicon glyph="chevron-right" />
                </Button>   
                
                <ScheduleShiftAddModal />
                <ScheduleShiftCopyModal />
            </div>

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
export default connect<ScheduleControlsStateProps, ScheduleDistpatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);