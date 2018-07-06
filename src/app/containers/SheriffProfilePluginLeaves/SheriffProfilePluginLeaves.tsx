import React from 'react';
// import moment from 'moment';
import { IdType, Leave } from '../../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import {
    // Table,
    // Button,
    // Glyphicon,
    Alert
} from 'react-bootstrap';
import {
    // FieldArray,
    // Field,
    FormErrors
} from 'redux-form';
import { Dispatch } from 'redux';
import { getLeaves, createOrUpdateLeaves } from '../../modules/leaves/actions';
import { RootState } from '../../store';
import {
    getSheriffFullDayLeaves,
    getSheriffPartialLeaves,
} from '../../modules/leaves/selectors';
import LeavesDisplay from '../../components/LeavesDisplay';
import * as Validators from '../../infrastructure/Validators';
import LeavesFieldTable from './LeavesFieldTable';

export interface SheriffProfilePluginLeavesProps {
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
    FormComponent = (props: SheriffProfilePluginProps<SheriffProfilePluginLeavesProps>) => (
        <div>
            <LeavesFieldTable
                fieldName={this.formFieldNames.fullDay}
                title="Full Day"
                columns={[
                    LeavesFieldTable.DateColumn('Start Date', 'startDate'),
                    LeavesFieldTable.DateColumn('End Date', 'endDate'),
                    LeavesFieldTable.LeaveCodeColumn,
                    LeavesFieldTable.CancelColumn
                ]}
            />

            <LeavesFieldTable
                fieldName={this.formFieldNames.partialDay}
                title="Partial Day"
                columns={[
                    LeavesFieldTable.DateColumn('Date', 'startDate'),
                    LeavesFieldTable.TimeColumn('Start Time', 'Start', 'startDate'),
                    LeavesFieldTable.TimeColumn('End Time', 'End', 'endDate'),
                    LeavesFieldTable.LeaveCodeColumn,
                    LeavesFieldTable.CancelColumn
                ]}
            />
        </div>
    )
    DisplayComponent = (
        { data = { fullDay: [], partialDay: [] } }: SheriffProfilePluginProps<SheriffProfilePluginLeavesProps>) => (

            data && (data.fullDay.length > 0 || data.partialDay.length > 0)
                ? <LeavesDisplay partialDays={data.partialDay} fullDays={data.fullDay} />
                : <Alert> No Leaves </Alert>
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

        const errors = { fullDay: fullDayErrors, partialDay: partialDayErrors };

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