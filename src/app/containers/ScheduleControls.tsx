import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Glyphicon,
    Button
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
import { ConfirmationModal } from '../components/ConfirmationModal';
import ScheduleMultiShiftEditModal from './ScheduleMultiShiftEditModal';

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
    showMultiShiftEditModal: (selectedShiftIds: IdType[]) => void;
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
            // submit,
            showMultiShiftEditModal,
            clear,
            deleteShift,
            selectedShifts = [],
            setSelectedShifts
        } = this.props;

        const areShiftsSelected = selectedShifts.length > 0;

        return (
            <div
                style={{
                    display: 'flex',
                    paddingLeft: 200
                }}
            >

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
                </div>

                <div 
                    style={{ 
                        position: 'absolute', 
                        right: 10,
                        paddingTop: 5 
                    }}
                >
                    <Button
                        className="action-button secondary"
                        style={{ marginRight: 6 }}
                        onClick={() => setSelectedShifts && setSelectedShifts(this.allVisibleShiftIds())}
                    >
                        Select All
                    </Button>

                    <Button
                        className="action-button secondary"
                        style={{ marginRight: 40 }} 
                        onClick={() => clear && clear()}
                    >
                        Deselect
                    </Button>

                    <Button
                        className="action-button"
                        style={{ marginRight: 6 }} 
                        onClick={() => showShiftAddModal()}
                    >
                        <Glyphicon glyph="plus" />
                    </Button>

                    <Button 
                        style={{ 
                            marginRight: -6, 
                            backgroundColor: areShiftsSelected ? '#327AB7' : 'grey',
                            borderColor: areShiftsSelected ? '#327AB7' : 'grey',
                            // backgroundColor: areShiftsSelected ? 'green' : 'grey',
                            // borderColor: areShiftsSelected ? 'green' : 'grey',
                            color: 'white'
                        }}
                        onClick={() => showMultiShiftEditModal(selectedShifts)}
                        disabled={!areShiftsSelected}
                    >
                        <Glyphicon glyph="pencil" />
                    </Button>

                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => deleteShift && deleteShift(selectedShifts)}
                        actionBtnLabel={<Glyphicon glyph="trash" style={{fontSize: 18}} />}
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        // tslint:disable-next-line:max-line-length
                        message={<p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> the selected shift(s).</p>}
                        title="Delete Shift(s)"
                    />

                    <Button
                        className="action-button"
                        onClick={() => showShiftCopyModal()}
                        style={{ marginLeft: 20 }} 
                    >
                        Import Shifts
                    </Button>

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
    setSelectedShifts: selectShifts,
    showMultiShiftEditModal: (selectedShifts: IdType[]) => ScheduleMultiShiftEditModal.ShowAction(selectedShifts)
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleControlsStateProps, ScheduleDistpatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);