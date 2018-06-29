import React from 'react';
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
import { getSheriffLeaves } from '../modules/leaves/selectors';
import LeavesDisplay from '../components/LeavesDisplay';
import * as Validators from '../infrastructure/Validators';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import SelectorField from '../components/FormElements/SelectorField';

interface CancelLeaveButtonProps {
}

interface CancelLeaveButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps) => void;
}

class CancelLeaveButton extends React.PureComponent<CancelLeaveButtonProps & CancelLeaveButtonDispatchProps> {
    render() {
        const { showConfirmationModal } = this.props;
        return (
            <Button
                bsStyle="link"
                onClick={() => showConfirmationModal({
                    confirmBtnLabel: 'OK',
                    RenderComponent: ({message}) => (
                        <div>
                            <h3>Select a Reason for Cancelling Leave</h3>
                            <LeaveCancelReasonSelector label="Cancel Reason"/>
                        </div>
                    )
                })}
                style={{
                    color: 'red',
                    fontSize: 16
                }}
            >
                <Glyphicon glyph="ban-circle" />
            </Button>
        );
    }
}

const ConnectedCancelLeaveButton = connect<{}, CancelLeaveButtonDispatchProps, CancelLeaveButtonProps>(
    undefined,
    {
        showConfirmationModal: (props: ConnectedConfirmationModalProps) => ConfirmationModal.ShowAction(props)
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
                                <th className="text-left"/>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((fieldInstanceName, index) => {
                                const { id: leaveId } = fields.get(index);
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Field
                                                name={`${fieldInstanceName}.startDate`}
                                                component={DateField as any}
                                                label="Start"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                name={`${fieldInstanceName}.endDate`}
                                                component={DateField as any}
                                                label="End"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                name={`${fieldInstanceName}.leaveTypeCode`}
                                                component={(p) => <SelectorField 
                                                    {...p} 
                                                    showLabel={false}
                                                    SelectorComponent={
                                                        (sp) => 
                                                            <LeaveTypeSelector {...sp}/>}  
                                                />}
                                                label="Type"
                                            />
                                        </td>
                                        <td>
                                            {!leaveId &&
                                                <Button
                                                    bsStyle="link"
                                                    onClick={() => fields.remove(index)}
                                                    style={{
                                                        color: '#666666',
                                                        fontSize: 14
                                                    }}
                                                >
                                                    <Glyphicon glyph="remove" />
                                                </Button>}
                                            {leaveId &&
                                                <ConnectedCancelLeaveButton />
                                            }

                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <Button
                                        onClick={() => fields.push({} as any)}
                                    >
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