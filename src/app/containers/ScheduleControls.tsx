import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Button,
    Glyphicon,
    Dropdown,
    MenuItem
} from 'react-bootstrap';
import { visibleTime } from '../modules/schedule/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/schedule/actions';
import CalendarButton from '../components/CalendarButton/CalendarButton';
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';
import ScheduleShiftAddModal from './ScheduleShiftAddModal';
import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';

interface ScheduleControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface ScheduleControlsProps {
}

interface ScheduleDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    showShiftCopyModal: () => void;
    showShiftAddModal: () => void;
}

class ScheduleControls extends React.PureComponent<
    ScheduleControlsProps & ScheduleControlsStateProps & ScheduleDistpatchProps> {

    render() {
        const { 
            visibleTimeStart, 
            visibleTimeEnd, 
            updateVisibleTime, 
            showShiftCopyModal,
            showShiftAddModal 
        } = this.props;

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingLeft: 200
                }}
            >
                <div
                    style={{
                        margin: 10,
                        paddingRight: 15
                    }}
                >
                    <ScheduleShiftMultiEditForm />
                </div>

                <div className="toolbar-calendar-control">
                    <Button
                        onClick={() => updateVisibleTime(
                            moment(visibleTimeStart).subtract('week', 1),
                            moment(visibleTimeEnd).subtract('week', 1)
                        )}
                        bsStyle="link"
                        bsSize="large"
                        style={{ color: 'white' }}
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
                        style={{ color: 'white' }}
                    >
                        <Glyphicon glyph="chevron-right" />
                    </Button>

                    <div
                        style={{
                            paddingTop: 6,
                            background: '#003366',
                            zIndex: 1000,
                            textAlign: 'left'
                        }}
                    >
                        <Dropdown id="schedule-control-menu" pullRight={true}>
                            <Dropdown.Toggle 
                                noCaret={true} 
                                style={{ fontSize: 18, background: 'transparent', color: 'white', border: 0 }}>
                                <Glyphicon glyph="menu-hamburger" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem onClick={() => showShiftAddModal()}>Add Shift</MenuItem>
                                <MenuItem onClick={() => showShiftCopyModal()}>Copy Shifts</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: RootState) => {
    return visibleTime(state);
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime,
    showShiftCopyModal: () => ScheduleShiftCopyModal.ShowAction(),
    showShiftAddModal: () => ScheduleShiftAddModal.ShowAction()
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleControlsStateProps, ScheduleDistpatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);