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
import {
    visibleTime,
    selectedShifts
} from '../modules/schedule/selectors';
import {
    updateVisibleTime as setVisibleTime,
    clearSelectedShifts
} from '../modules/schedule/actions';
import { deleteShift } from '../modules/shifts/actions';
import CalendarButton from '../components/CalendarButton/CalendarButton';
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';
import ScheduleShiftAddModal from './ScheduleShiftAddModal';
import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';
import { IdType } from '../api/Api';

interface ScheduleControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface ScheduleControlsProps {
    submit?: () => void;
    cancel?: () => void;
    deleteShift?: (shiftIds: IdType[]) => void;
    selectedShifts?: IdType[];
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
            showShiftAddModal,
            submit,
            cancel,
            // tslint:disable:no-shadowed-variable
            deleteShift,
            selectedShifts = []
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
                    <ScheduleShiftMultiEditForm
                        onApply={
                            () => {
                                submit && submit();
                                cancel && cancel();
                            }
                        }
                        onCancel={() => cancel && cancel()}
                        onDelete={
                            () => {
                                deleteShift && deleteShift(selectedShifts);
                                cancel && cancel();
                            }
                        }
                    />
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

                    <div style={{ paddingTop: 5 }}>
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
                    </div>
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
    const currentVisibleTime = visibleTime(state);
    return {
        ...currentVisibleTime,
        selectedShifts: selectedShifts(state)
    };
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime,
    showShiftCopyModal: () => ScheduleShiftCopyModal.ShowAction(),
    showShiftAddModal: () => ScheduleShiftAddModal.ShowAction(),
    submit: ScheduleShiftMultiEditForm.submitAction,
    cancel: clearSelectedShifts,
    deleteShift: deleteShift
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleControlsStateProps, ScheduleDistpatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);