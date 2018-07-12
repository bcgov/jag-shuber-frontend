import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Glyphicon,
    Dropdown,
    MenuItem
} from 'react-bootstrap';
import {
    visibleTime,
    selectedShiftIds
} from '../modules/schedule/selectors';
import {
    updateVisibleTime as setVisibleTime,
    clearSelectedShifts,
    selectShifts
} from '../modules/schedule/actions';
import { deleteShift as deleteShiftAction } from '../modules/shifts/actions';
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';
import ScheduleShiftAddModal from './ScheduleShiftAddModal';
import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';
import { IdType, Shift } from '../api/Api';
import DateRangeControls from '../components/DateRangeControls';
import { allShifts } from '../modules/shifts/selectors';

interface ScheduleControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface ScheduleControlsProps {
    submit?: () => void;
    clear?: () => void;
    deleteShift?: (shiftIds: IdType[]) => void;
    setSelectedShifts?: (shiftIds: IdType[]) => void;
    selectedShifts?: IdType[];
    shifts?: Shift[];
}

interface ScheduleDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    showShiftCopyModal: () => void;
    showShiftAddModal: () => void;
}

class ScheduleControls extends React.PureComponent<
    ScheduleControlsProps & ScheduleControlsStateProps & ScheduleDistpatchProps> {

    allVisibleShiftIds() {
        const { visibleTimeStart, visibleTimeEnd, shifts = [] } = this.props;
        return shifts
            .filter(s => moment(s.startDateTime).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'))
            .map(vs => vs.id);
    }

    render() {
        const {
            visibleTimeStart,
            visibleTimeEnd,
            updateVisibleTime,
            showShiftCopyModal,
            showShiftAddModal,
            submit,
            clear,
            deleteShift,
            selectedShifts = [],
            setSelectedShifts
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
                        margin: '5px 10px',
                        paddingRight: 15
                    }}
                >
                    <ScheduleShiftMultiEditForm
                        onApply={
                            () => {
                                submit && submit();
                                clear && clear();
                            }
                        }
                        onClear={() => clear && clear()}
                        onDelete={
                            () => {
                                deleteShift && deleteShift(selectedShifts);
                                clear && clear();
                            }
                        }
                        onSelectAll={() => setSelectedShifts && setSelectedShifts(this.allVisibleShiftIds())}
                    />
                </div>

                <div className="toolbar-calendar-control">
                    <DateRangeControls
                        defaultDate={moment(visibleTimeStart)}
                        onNext={() => updateVisibleTime(
                            moment(visibleTimeStart).add('week', 1),
                            moment(visibleTimeEnd).add('week', 1)
                        )}
                        onPrevious={() => updateVisibleTime(
                            moment(visibleTimeStart).subtract('week', 1),
                            moment(visibleTimeEnd).subtract('week', 1)
                        )}
                        onSelect={(selectedDate) => updateVisibleTime(
                            moment(selectedDate).startOf('week').add(1, 'day'),
                            moment(selectedDate).endOf('week').subtract(1, 'day')
                        )}
                        onToday={() => updateVisibleTime(
                            moment().startOf('week').add(1, 'day'),
                            moment().endOf('week').subtract(1, 'day')
                        )}
                    />
                    <div
                        style={{
                            paddingTop: 2,
                            background: '#003366',
                            zIndex: 900,
                            textAlign: 'left'
                        }}
                    >
                        <Dropdown id="schedule-control-menu" pullRight={true}>
                            <Dropdown.Toggle
                                noCaret={true}
                                style={{
                                    fontSize: 22,
                                    background: 'transparent',
                                    color: 'white',
                                    border: 0,
                                    paddingLeft: 18,
                                    paddingRight: 15
                                }}
                            >
                                <Glyphicon glyph="menu-hamburger" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem onClick={() => showShiftAddModal()}>Add Shift</MenuItem>
                                <MenuItem onClick={() => showShiftCopyModal()}>Import Shifts</MenuItem>
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
        selectedShifts: selectedShiftIds(state),
        shifts: allShifts(state)
    };
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime,
    showShiftCopyModal: () => ScheduleShiftCopyModal.ShowAction(),
    showShiftAddModal: () => ScheduleShiftAddModal.ShowAction(),
    submit: ScheduleShiftMultiEditForm.submitAction,
    clear: clearSelectedShifts,
    deleteShift: deleteShiftAction,
    setSelectedShifts: selectShifts
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleControlsStateProps, ScheduleDistpatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);