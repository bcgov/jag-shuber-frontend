import React from 'react';
import { IdType, Leave, LEAVE_CODE_TRAINING } from '../../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import {
    Alert
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';
import { Dispatch } from 'redux';
import { getLeaves, createOrUpdateLeaves } from '../../modules/leaves/actions';
import { RootState } from '../../store';
import {
    getSheriffFullDayTrainingLeaves,
    getSheriffPartialTrainingLeaves
} from '../../modules/leaves/selectors';
import LeavesDisplay from '../../components/LeavesDisplay';
import * as Validators from '../../infrastructure/Validators';
import LeavesFieldTable from './LeavesFieldTable';
import { toTimeString } from 'jag-shuber-api/dist/client';

export interface SheriffProfilePluginTrainingProps {
    partialDay: Leave[];
    fullDay: Leave[];
}

export default class SheriffProfilePluginTraining
    extends SheriffProfileSectionPlugin<SheriffProfilePluginTrainingProps> {

    name = 'training';
    formFieldNames = {
        fullDay: 'training.fullDay',
        partialDay: 'training.partialDay'
    };
    title: string = 'Training';
    FormComponent = (props: SheriffProfilePluginProps<SheriffProfilePluginTrainingProps>) => (
        <div>
            <LeavesFieldTable
                fieldName={this.formFieldNames.fullDay}
                title={<h3>Full Day</h3>}
                columns={[
                    LeavesFieldTable.DateColumn('Start Date', 'startDate'),
                    LeavesFieldTable.DateColumn('End Date', 'endDate'),
                    LeavesFieldTable.LeaveSubCodeColumn(false),
                    LeavesFieldTable.CancelColumn
                ]}
            />

            <LeavesFieldTable
                fieldName={this.formFieldNames.partialDay}
                title={<h3>Partial Day</h3>}
                columns={[
                    LeavesFieldTable.DateColumn('Date', 'startDate'),
                    LeavesFieldTable.TimeColumn('Start Time', 'Start', 'startTime'),
                    LeavesFieldTable.TimeColumn('End Time', 'End', 'endTime'),
                    LeavesFieldTable.LeaveSubCodeColumn(false),
                    LeavesFieldTable.CancelColumn
                ]}
            />
        </div>
    )
    DisplayComponent = (
        { data = { fullDay: [], partialDay: [] } }: SheriffProfilePluginProps<SheriffProfilePluginTrainingProps>) => (

            data && (data.fullDay.length > 0 || data.partialDay.length > 0)
                ? <LeavesDisplay partialDays={data.partialDay} fullDays={data.fullDay} />
                : <Alert> No Training </Alert>
        )

    validate(values: SheriffProfilePluginTrainingProps = { fullDay: [], partialDay: [] }): FormErrors | undefined {
        let fullDayErrors: any = [];

        if (values.fullDay) {
            fullDayErrors = values.fullDay.map(l => (
                {
                    startDate: Validators.validateWith(
                        Validators.required,
                        Validators.isSameOrBefore(l.endDate, 'End Date')
                    )(l.startDate),
                    endDate: Validators.validateWith(
                        Validators.required,
                        Validators.isSameOrAfter(l.startDate, 'Start Date')
                    )(l.endDate),
                    leaveSubCode: Validators.required(l.leaveSubCode)
                }
            ));
        }

        let partialDayErrors: any = [];
        if (values.partialDay) {
            partialDayErrors = values.partialDay.map(l => (
                {
                    startDate: Validators.validateWith(
                        Validators.required
                    )(l.startDate),
                    startTime: Validators.validateWith(
                        Validators.required,
                        Validators.isTimeBefore(l.endTime, 'End Time')
                    )(l.startTime),
                    endTime: Validators.validateWith(
                        Validators.required,
                        Validators.isTimeAfter(l.startTime, 'Start Time')
                    )(l.endTime),
                    leaveSubCode: Validators.required(l.leaveSubCode)
                }
            ));
        }

        const errors = { fullDay: fullDayErrors, partialDay: partialDayErrors };

        return (errors.fullDay.length > 0 || errors.partialDay.length > 0) ? errors : undefined;
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        dispatch(getLeaves());
    }

    getData(sheriffId: IdType, state: RootState) {
        return {
            partialDay: getSheriffPartialTrainingLeaves(sheriffId)(state),
            fullDay: getSheriffFullDayTrainingLeaves(sheriffId)(state)
        };
    }

    getDataFromFormValues(formValues: any): SheriffProfilePluginTrainingProps {
        return super.getDataFromFormValues(formValues) || {
            fullDay: [],
            partialDay: []
        };
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<Leave[]> {
        const data = this.getDataFromFormValues(formValues);
        const partialLeaves = data.partialDay.map(pl => ({ ...pl, sheriffId, isPartial: true }));
        const fullLeaves = data.fullDay.map(fl => ({ ...fl, sheriffId, isPartial: false }));
        const allLeaves = partialLeaves.concat(fullLeaves).map(l => ({
            ...l,
            leaveCode: LEAVE_CODE_TRAINING,
            startTime: toTimeString(l.startTime),
            endTime: toTimeString(l.endTime)
        }));

        return allLeaves.length > 0 ? await dispatch(createOrUpdateLeaves(allLeaves, { toasts: {} })) : [];
    }
}