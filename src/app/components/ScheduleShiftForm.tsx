import * as React from 'react';
import * as moment from 'moment';
import Form from './FormElements/Form';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import {
    DateType,
    TimeType,
    WorkSectionCode,
    Shift
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import SheriffSelector from '../containers/SheriffSelector';
import SelectorField from './FormElements/SelectorField';
export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart?: DateType;
    isSingleShift?: boolean;
    shiftTitle?: string;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {

    static parseShiftFormValues(values: any): Shift {
        const { timeRange, ...shiftValues } = values;
        const updatedShift = {
            ...shiftValues, 
            startDateTime: timeRange.startTime,
            endDateTime: timeRange.endTime
        };

        return updatedShift as Shift;
    }

    static shiftToFormValues(shift: Shift) {
        return{ 
            ...shift, 
            timeRange: {
                startTime: moment(shift.startDateTime).toISOString(),
                endTime: moment(shift.endDateTime).toISOString()
            }
        };
    }

    private renderMultiShiftCreationFields() {
        return (
            <div>
                <Field
                    name="days"
                    component={DaysOfWeekChecklist as any}
                    label="Days"
                    validate={[Validators.required]}
                />
                <Field
                    name="repeatNumber"
                    component={NumberSpinner as any}
                    label="Number of FTEs required"
                    validate={[
                        Validators.required,
                        Validators.max50,
                        Validators.min1,
                        Validators.integer
                    ]}
                />
            </div>
        );
    }

    private renderShiftFields() {
        const {
            minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString(),
            maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString(),
            workSectionId
        } = this.props;
        return (
            <div>
                <Field
                    name="workSectionId"
                    component={(p) => <SelectorField 
                        {...p} 
                        SelectorComponent={
                            (sp) => 
                                <WorkSectionSelector {...sp} />}  
                    />}
                    label="Work Section"
                />
                <Field
                    name="timeRange"
                    component={(p) => <TimeSliderField
                        {...p}
                        minTime={minTime}
                        maxTime={maxTime}
                        timeIncrement={15}
                        color={getWorkSectionColour(workSectionId)}
                    />}
                    label="Time Range"
                />
                <br />
            </div>
        );
    }

    private renderSheriffField() {
        return (
            <Field
                name="sheriffId"
                component={(p) => <SelectorField 
                    {...p} 
                    SelectorComponent={
                        (sp) => <SheriffSelector {...sp} />}  
                />}
                label="Sheriff"
            />
        );
    }

    render() {
        const { shiftTitle, isSingleShift } = this.props;
        return (
            <div>
                <h1>{shiftTitle}</h1>
                <Form {...this.props}>
                    {this.renderShiftFields()}
                    {!isSingleShift && this.renderMultiShiftCreationFields()}
                    {isSingleShift && this.renderSheriffField()}
                </Form>
            </div>
        );
    }
}