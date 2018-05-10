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
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';
// import ScheduleShiftAddModal from './ScheduleShiftAddModal';
// import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';

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
            
            <div style={{display: 'flex'}}>
                <div 
                    style={{
                        marginTop: 10
                    }}
                >
                    <ScheduleShiftMultiEditForm />
                </div>
                <div 
                    style={{ 
                        textAlign: 'center', 
                        display: 'flex', 
                        backgroundColor: '#327AB7',
                        marginTop: 5
                    }}
                >
                    <Button
                        onClick={() => updateVisibleTime(
                            moment(visibleTimeStart).subtract('week', 1),
                            moment(visibleTimeEnd).subtract('week', 1)
                        )}
                        bsStyle="link" 
                        bsSize="large" 
                        style={{color: 'white'}}
                    >
                        <Glyphicon glyph="chevron-left" />
                    </Button>
                    
                    <CalendarButton 
                        onChange={(selectedDate) => updateVisibleTime(
                            moment(selectedDate).startOf('week').add(1, 'day'),
                            moment(selectedDate).endOf('week').subtract(1, 'day')
                        )}
                        defaultValue={visibleTimeStart}
                        todayOnClick={() => updateVisibleTime(
                            moment().startOf('week').add(1, 'day'),
                            moment().endOf('week').subtract(1, 'day')
                        )}
                    />

                    <Button
                        onClick={() => updateVisibleTime(
                            moment(visibleTimeStart).add('week', 1),
                            moment(visibleTimeEnd).add('week', 1)
                        )}
                        bsStyle="link" 
                        bsSize="large" 
                        style={{color: 'white'}}
                    >
                        <Glyphicon glyph="chevron-right" />
                    </Button> 
                    
                    {/* <ScheduleShiftAddModal />
                    <ScheduleShiftCopyModal /> */}
                </div>
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