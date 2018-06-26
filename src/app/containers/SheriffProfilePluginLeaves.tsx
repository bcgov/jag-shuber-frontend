import React from 'react';
import { IdType, Leave } from '../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../components/SheriffProfile/SheriffProfilePlugin';
import moment from 'moment';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import { FieldArray, Field } from 'redux-form';
import LeaveCancelReasonSelector from './LeaveCancelReasonSelector';
import LeaveTypeSelector from './LeaveTypeSelector';
import DateField from '../components/FormElements/DateField';
import Popover from '../components/Popover';
import { Dispatch } from 'redux';
import { getLeaves, createOrUpdateLeaves } from '../modules/leaves/actions';

export default class SheriffProfilePluginLeaves extends SheriffProfileSectionPlugin<Leave[]> {
    name = 'leaves';
    formFieldNames = {
        leaves: 'leaves'
    };
    title: string = 'Leaves';
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => {
        const leaves: Leave[] = [];
        return (

            <Table responsive={true} striped={true} >
                <thead>
                    <tr>
                        <th className="text-left">Start Date</th>
                        <th className="text-left">End Date</th>
                        <th className="text-left">Type</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {leaves.map(l => {
                        return (
                            <tr key={l.id}>
                                <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                <td>{moment(l.endDate).format('MMM D, YYYY')}</td>
                                <td>{l.leaveTypeCode}</td>
                                <td>
                                    {l.cancelDate && <Popover
                                        trigger={<Glyphicon style={{ color: 'red' }} glyph="ban-circle" />}
                                        title={'Leave Cancelled'}
                                        displayValue={
                                            <span>
                                                <b>Date: </b>{moment(l.cancelDate).format('MMM D, YYYY')}<br />
                                                <b>Reason: </b>{l.cancelReasonCode}
                                            </span>
                                        }
                                    />}
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        );
    }

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
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
                                <th className="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((fieldInstanceName, index) => {
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
                                                component={LeaveTypeSelector as any}
                                                label="Type"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                name={`${fieldInstanceName}.cancelReasonCode`}
                                                component={LeaveCancelReasonSelector as any}
                                                label="Cancel Reason"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            <br />
                            <Button
                                onClick={() => fields.push({} as any)}
                            >
                                <Glyphicon glyph="plus" />
                            </Button>
                        </tbody>
                    </Table>
                );
            }}
        />
    )

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        dispatch(getLeaves());
        // dispatch(getLeaveTypes());
        // dispatch(getLeaveCancelCodes());
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<Leave[]> {
        const { leaves = [] }: { leaves: Partial<Leave>[] } = formValues;
        const leavesWithSheriff = leaves.map(l => ({ ...l, sheriffId }));
        return await dispatch(createOrUpdateLeaves(leavesWithSheriff, { toasts: {} }));
    }
}