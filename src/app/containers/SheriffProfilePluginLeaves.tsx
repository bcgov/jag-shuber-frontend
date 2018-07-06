import React from 'react';
import moment from 'moment';
import { IdType, Leave } from '../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../components/SheriffProfile/SheriffProfilePlugin';
import { Table, Button, Glyphicon, Alert } from 'react-bootstrap';
import { FieldArray, Field, FormErrors } from 'redux-form';
import LeaveCancelReasonSelector from './LeaveCancelReasonSelector';
import LeaveSubCodeSelector from './PersonalLeaveSubCodeSelector';
import DateField from '../components/FormElements/DateField';
import { Dispatch } from 'redux';
import { getLeaves, createOrUpdateLeaves } from '../modules/leaves/actions';
import { RootState } from '../store';
import {
    getSheriffFullDayLeaves,
    getSheriffPartialLeaves,
    getLeave
} from '../modules/leaves/selectors';
import LeavesDisplay from '../components/LeavesDisplay';
import * as Validators from '../infrastructure/Validators';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import SelectorField from '../components/FormElements/SelectorField';
import LeaveCancelledPopover from '../components/LeaveCancelledPopover';
import TimePickerField from '../components/FormElements/TimePickerField';

interface CancelLeaveButtonProps {
    leaveId: string;
}

interface CancelLeaveButtonStateProps {
    leave?: Leave;
}
interface CancelLeaveButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) => void;
    cancelLeave: (leave: Leave) => void;
}

type CancelButtonCompositProps = CancelLeaveButtonProps & CancelLeaveButtonDispatchProps & CancelLeaveButtonStateProps;
class CancelLeaveButton extends React.PureComponent<CancelButtonCompositProps> {

    handleCancelLeave(cancelReason?: string) {
        const { leave, cancelLeave } = this.props;
        if (cancelReason && leave) {
            const leaveToCancel: Leave = {
                ...leave,
                cancelReasonCode: cancelReason,
                cancelDate: moment().toISOString()
            };

            cancelLeave(leaveToCancel);
        }

    }

    render() {
        const { showConfirmationModal } = this.props;
        return (
            <Button
                bsStyle="danger"
                onClick={() => showConfirmationModal({
                    confirmBtnLabel: 'OK',
                    RenderComponent: ({ onValueChanged, value }) => (
                        <div>
                            <h3>Select a Reason for Cancelling Leave</h3>
                            <LeaveCancelReasonSelector
                                label="Cancel Reason"
                                value={value}
                                onChange={onValueChanged}
                            />
                        </div>
                    ),
                    onConfirm: (value) => this.handleCancelLeave(value)
                })}
            >
                <Glyphicon glyph="ban-circle" />
            </Button>

        );
    }
}

const ConnectedCancelLeaveButton =
    connect<CancelLeaveButtonStateProps, CancelLeaveButtonDispatchProps, CancelLeaveButtonProps, RootState>(
        (state, { leaveId }) => {
            return {
                leave: getLeave(leaveId)(state)
            };
        },
        {
            showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) =>
                ConfirmationModal.ShowAction<string>(props),
            cancelLeave: (leaveToCancel) => createOrUpdateLeaves([leaveToCancel])
        }
    )(CancelLeaveButton);

interface SheriffProfilePluginLeavesProps {
    partialDay: Leave[];
    fullDay: Leave[];
}
export default class SheriffProfilePluginLeaves extends SheriffProfileSectionPlugin<SheriffProfilePluginLeavesProps> {
    name = 'leaves';
    formFieldNames = {
        fullDay: 'leaves.fullDay',
        partialDay: 'leaves.partialDay'
    };
    title: string = 'Leaves';
    DisplayComponent = (
        { data = { fullDay: [], partialDay: [] } }: SheriffProfilePluginProps<SheriffProfilePluginLeavesProps>) => (

            data && (data.fullDay.length > 0 || data.partialDay.length > 0)
                ? <LeavesDisplay partialDays={data.partialDay} fullDays={data.fullDay} />
                : <Alert> No Leaves </Alert>
        )
    FormComponent = ({ sheriffId }: SheriffProfilePluginProps<SheriffProfilePluginLeavesProps>) => (
        // tslint:disable-next-line:jsx-wrap-multiline
        <div>
            <FieldArray<Partial<Leave>>
                name={this.formFieldNames.fullDay}
                component={(p) => {
                    const { fields } = p;
                    return (
                        <Table striped={true} >
                            <thead>
                                <tr>
                                    <th className="text-left">Start Date</th>
                                    <th className="text-left">End Date</th>
                                    <th className="text-left">Type</th>
                                    <th className="text-left" />
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((fieldInstanceName, index) => {
                                    const currentLeave: Partial<Leave> = fields.get(index);
                                    const { id: leaveId, cancelDate, startDate, endDate, leaveTypeCode } = currentLeave;
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.startDate`}
                                                    component={DateField as any}
                                                    label="Start Date"
                                                />}
                                                {cancelDate && moment(startDate).format('MMM D, YYYY')}
                                            </td>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.endDate`}
                                                    component={DateField as any}
                                                    label="End Date"
                                                />}
                                                {cancelDate && moment(endDate).format('MMM D, YYYY')}
                                            </td>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.leaveTypeCode`}
                                                    component={(p) => <SelectorField
                                                        {...p}
                                                        showLabel={false}
                                                        SelectorComponent={
                                                            (sp) =>
                                                                <LeaveSubCodeSelector {...sp} />}
                                                    />}
                                                    label="Type"
                                                />}
                                                {cancelDate && leaveTypeCode}
                                            </td>
                                            <td>
                                                {!leaveId &&
                                                    <Button
                                                        bsStyle="link"
                                                        onClick={() => fields.remove(index)}
                                                        style={{ color: '#666666' }}
                                                    >
                                                        <Glyphicon glyph="remove" />
                                                    </Button>}
                                                {leaveId && !cancelDate &&
                                                    <ConnectedCancelLeaveButton leaveId={leaveId} />
                                                }
                                                {leaveId && cancelDate &&
                                                    <LeaveCancelledPopover leave={currentLeave} />
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <Button onClick={() => fields.push({} as any)}>
                                            <Glyphicon glyph="plus" />
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    );
                }}
            />

            <FieldArray<Partial<Leave>>
                name={this.formFieldNames.partialDay}
                component={(p) => {
                    const { fields } = p;
                    return (
                        <Table striped={true} >
                            <thead>
                                <tr>
                                    <th className="text-left">Date</th>
                                    <th className="text-left">Start Time</th>
                                    <th className="text-left">End Time</th>
                                    <th className="text-left">Type</th>
                                    <th className="text-left" />
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((fieldInstanceName, index) => {
                                    const currentLeave: Partial<Leave> = fields.get(index);
                                    // tslint:disable-next-line:max-line-length
                                    const { id: leaveId, cancelDate, startDate, startTime, endTime, leaveTypeCode } = currentLeave;
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.startDate`}
                                                    component={DateField as any}
                                                    label="Date"
                                                />}
                                                {cancelDate && moment(startDate).format('MMM D, YYYY')}
                                            </td>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.startTime`}
                                                    component={
                                                        (p) =>
                                                            <TimePickerField
                                                                {...p}
                                                                nullTimeLabel={'Start'}
                                                                timeIncrement={30}
                                                                style={{ width: 780 }}
                                                            />
                                                    }
                                                    label="Start Time"
                                                />}
                                                {cancelDate && moment(startTime).format('HH:mm')}
                                            </td>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.endTime`}
                                                    component={
                                                        (p) =>
                                                            <TimePickerField
                                                                {...p}
                                                                nullTimeLabel={'End'}
                                                                timeIncrement={30}
                                                                style={{ width: 780 }}
                                                            />
                                                    }
                                                    label="End Time"
                                                />}
                                                {cancelDate && moment(endTime).format('HH:mm')}
                                            </td>
                                            <td>
                                                {!cancelDate && <Field
                                                    name={`${fieldInstanceName}.leaveTypeCode`}
                                                    component={(p) => <SelectorField
                                                        {...p}
                                                        showLabel={false}
                                                        SelectorComponent={
                                                            (sp) =>
                                                                <LeaveSubCodeSelector {...sp} />}
                                                    />}
                                                    label="Type"
                                                />}
                                                {cancelDate && leaveTypeCode}
                                            </td>
                                            <td>
                                                {!leaveId &&
                                                    <Button
                                                        bsStyle="link"
                                                        onClick={() => fields.remove(index)}
                                                        style={{ color: '#666666' }}
                                                    >
                                                        <Glyphicon glyph="remove" />
                                                    </Button>}
                                                {leaveId && !cancelDate &&
                                                    <ConnectedCancelLeaveButton leaveId={leaveId} />
                                                }
                                                {leaveId && cancelDate &&
                                                    <LeaveCancelledPopover leave={currentLeave} />
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <Button onClick={() => fields.push({} as any)}>
                                            <Glyphicon glyph="plus" />
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    );
                }}
            />
        </div>
    )

    validate(values: SheriffProfilePluginLeavesProps = { fullDay: [], partialDay: [] }): FormErrors | undefined {
        const fullDayErrors = values.fullDay.map(l => (
            {
                startDate: Validators.validateWith(
                    Validators.required,
                    Validators.isSameOrBefore(l.endDate, 'End Date')
                )(l.startDate),
                endDate: Validators.validateWith(
                    Validators.required,
                    Validators.isSameOrAfter(l.startDate, 'Start Date')
                )(l.endDate),
                leaveTypeCode: Validators.required(l.leaveTypeCode)
            }
        ));

        const partialDayErrors = values.partialDay.map(l => (
            {
                startDate: Validators.validateWith(
                    Validators.required
                )(l.startDate),
                startTime: Validators.validateWith(
                    Validators.required,
                    Validators.isSameOrBefore(l.endDate, 'End Time')
                )(l.startTime),
                endTime: Validators.validateWith(
                    Validators.required,
                    Validators.isSameOrAfter(l.startTime, 'Start Time')
                )(l.endTime),
                leaveTypeCode: Validators.required(l.leaveTypeCode)
            }
        ));

        const errors = {fullDay: fullDayErrors, partialDay: partialDayErrors};

        return (errors.fullDay.length > 0 || errors.partialDay.length > 0) ? errors : undefined;
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        dispatch(getLeaves());
    }

    getData(sheriffId: IdType, state: RootState) {
        return {
            partialDay: getSheriffPartialLeaves(sheriffId)(state),
            fullDay: getSheriffFullDayLeaves(sheriffId)(state)
        };
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<Leave[]> {
        const data = this.getDataFromFormValues(formValues);
        const partialLeaves = data.partialDay.map(pl => ({ ...pl, sheriffId, isPartial: true }));
        const fullLeaves = data.fullDay.map(fl => ({ ...fl, sheriffId, isPartial: false }));
        return await dispatch(createOrUpdateLeaves(partialLeaves.concat(fullLeaves), { toasts: {} }));
    }
}