import * as React from 'react';
import * as moment from 'moment';
import { Form } from 'react-bootstrap';
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
                    component={DaysOfWeekChecklist}
                    label="Days"
                    validate={[Validators.required]}
                />
                <Field
                    name="repeatNumber"
                    component={NumberSpinner}
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
                    component={WorkSectionSelector}
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
                component={SheriffSelector}
                label="Sheriff"
            />
        );
    }

    render() {
        const { handleSubmit, shiftTitle, isSingleShift } = this.props;
        return (
            <div>
                <h1>{shiftTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    {this.renderShiftFields()}
                    {!isSingleShift && this.renderMultiShiftCreationFields()}
                    {isSingleShift && this.renderSheriffField()}
                </Form>
            </div>
        );
    }
}