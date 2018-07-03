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
import LeaveTypeSelector from './LeaveTypeSelector';
import DateField from '../components/FormElements/DateField';
import { Dispatch } from 'redux';
import { getLeaves, createOrUpdateLeaves } from '../modules/leaves/actions';
import { RootState } from '../store';
import {
    getSheriffLeaves,
    getLeave
} from '../modules/leaves/selectors';
import LeavesDisplay from '../components/LeavesDisplay';
import * as Validators from '../infrastructure/Validators';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import SelectorField from '../components/FormElements/SelectorField';
import LeaveCancelledPopover from '../components/LeaveCancelledPopover';

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

export default class SheriffProfilePluginLeaves extends SheriffProfileSectionPlugin<Leave[]> {
    name = 'leaves';
    formFieldNames = {
        leaves: 'leaves'
    };
    title: string = 'Leaves';
    DisplayComponent = ({ data = [] }: SheriffProfilePluginProps<Leave[]>) => (
        data.length > 0
            ? <LeavesDisplay leaves={data} />
            : <Alert> No Leaves </Alert>
    )
    FormComponent = ({ sheriffId }: SheriffProfilePluginProps<Leave[]>) => (
        // tslint:disable-next-line:jsx-wrap-multiline
        <FieldArray<Partial<Leave>>
            name={this.formFieldNames.leaves}
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
                                                label="Start"
                                            />}
                                           {cancelDate && moment(startDate).format('MMM D, YYYY')}
                                        </td>
                                        <td>
                                            {!cancelDate && <Field
                                                name={`${fieldInstanceName}.endDate`}
                                                component={DateField as any}
                                                label="End"
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
                                                            <LeaveTypeSelector {...sp} />}
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
    )

    validate(values: Leave[] = []): FormErrors | undefined {
        const errors = values.map(l => (
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

        return errors.length > 0 ? errors : undefined;
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        dispatch(getLeaves());
    }

    getData(sheriffId: IdType, state: RootState) {
        return getSheriffLeaves(sheriffId)(state);
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<Leave[]> {
        const { leaves = [] }: { leaves: Partial<Leave>[] } = formValues;
        const leavesWithSheriff = leaves.map(l => ({ ...l, sheriffId }));
        return await dispatch(createOrUpdateLeaves(leavesWithSheriff, { toasts: {} }));
    }
}