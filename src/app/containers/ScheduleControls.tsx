import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Glyphicon,
    Button,
    MenuItem,
    Dropdown
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
import { getSheriffList } from '../modules/sheriffs/actions';
import { deleteShift as deleteShiftAction } from '../modules/shifts/actions';
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';
import ScheduleShiftAddModal from './ScheduleShiftAddModal';
import ScheduleShiftCopyModal from './ScheduleShiftCopyModal';
import { DateRange, IdType, Shift, WorkSectionCode } from '../api/Api';
import DateRangeControls from '../components/DateRangeControls';
import { allShifts } from '../modules/shifts/selectors';
import { ConfirmationModal } from '../components/ConfirmationModal';
import ScheduleMultiShiftEditModal from './ScheduleMultiShiftEditModal';
import { WORK_SECTIONS } from '../api';

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

interface ScheduleDispatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    fetchSheriffs: (dateRange?: DateRange) => void;
    showShiftCopyModal: () => void;
    showShiftAddModal: (workSectionId?: WorkSectionCode) => void;
    showMultiShiftEditModal: (selectedShiftIds: IdType[]) => void;
}

class ScheduleControls
    extends React.PureComponent<
        ScheduleControlsProps &
        ScheduleControlsStateProps &
        ScheduleDispatchProps> {

    constructor(props: ScheduleControlsProps & ScheduleControlsStateProps & ScheduleDispatchProps) {
        super(props);

        this.onPrevious = this.onPrevious.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onToday = this.onToday.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillReceiveProps(
        nextProps: ScheduleControlsProps & ScheduleControlsStateProps & ScheduleDispatchProps,
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

    allVisibleShiftIds() {
        const { visibleTimeStart, visibleTimeEnd, shifts = [] } = this.props;
        return shifts
            .filter(s => moment(s.startDateTime as any).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'))
            .map(vs => vs.id);
    }

    render() {
        const {
            visibleTimeStart,
            showShiftCopyModal,
            showShiftAddModal,
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
                        onNext={this.onNext}
                        onPrevious={this.onPrevious}
                        onSelect={this.onSelect}
                        onToday={this.onToday}
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

                    <Dropdown
                        id="task-type-dropdown"
                        style={{ marginRight: 6 }}
                    >
                        <Dropdown.Toggle noCaret={true} className="action-button">
                            <Glyphicon glyph="plus" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Object.keys(WORK_SECTIONS).map((k) => {
                                    return (
                                        <MenuItem
                                            key={k}
                                            onSelect={() => showShiftAddModal(k as WorkSectionCode)}
                                        >
                                            {WORK_SECTIONS[k]}
                                        </MenuItem>
                                    );
                                })

                            }
                            <MenuItem key={'NA'} onSelect={() => showShiftAddModal()}>
                                Not Applicable
                            </MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        style={{
                            marginRight: -6,
                            backgroundColor: areShiftsSelected ? '#327AB7' : 'grey',
                            borderColor: areShiftsSelected ? '#327AB7' : 'grey',
                            color: 'white'
                        }}
                        onClick={() => showMultiShiftEditModal(selectedShifts)}
                        disabled={!areShiftsSelected}
                    >
                        <Glyphicon glyph="pencil" />
                    </Button>

                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => {
                            if (deleteShift) {
                                deleteShift(selectedShifts);
                            }
                            if (clear) {
                                clear();
                            }
                        }}
                        actionBtnLabel={<Glyphicon glyph="trash" style={{ fontSize: 18 }} />}
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        // tslint:disable-next-line:max-line-length
                        message={<p style={{ fontSize: 14 }}><b>Permanently delete</b> the selected shift(s)?</p>}
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
    fetchSheriffs: getSheriffList,
    showShiftCopyModal: () => ScheduleShiftCopyModal.ShowAction(),
    showShiftAddModal: (workSectionId?: WorkSectionCode) => ScheduleShiftAddModal.ShowAction(workSectionId),
    submit: ScheduleShiftMultiEditForm.submitAction,
    clear: clearSelectedShifts,
    deleteShift: deleteShiftAction,
    setSelectedShifts: selectShifts,
    showMultiShiftEditModal: (selectedShifts: IdType[]) => ScheduleMultiShiftEditModal.ShowAction(selectedShifts)
};

// tslint:disable-next-line:max-line-length
export default connect<ScheduleControlsStateProps, ScheduleDispatchProps, ScheduleControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleControls);
