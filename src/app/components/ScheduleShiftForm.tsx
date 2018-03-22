import * as React from 'react';
import * as moment from 'moment';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import * as DateTimeFieldConst from './FormElements/DateTimeFieldConst';
import {
    DateType,
    DaysOfWeek
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import CheckboxField from './FormElements/CheckboxField';

export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart: DateType;
    weekEnd: DateType;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {
    
        public static createDefaultShift() {
            return {
                startTime: moment().hour(9).minute(0),
                endTime: moment().hour(17).minute(0),
                days: DaysOfWeek.Weekdays,
                repeatNumber: 1
            };
        }

        render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Field 
                        name="workSectionId"
                        component={WorkSectionSelector}
                        label="Work Section"
                    />
                    <Field
                        name="workSectionNotRequired"
                        component={CheckboxField}
                        label="Work Section Not Applicable"
                    />
                    <Field
                        name="startTime"
                        component={DateTimeFieldConst.TimeField}
                        label="Start Time"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="endTime"
                        component={DateTimeFieldConst.TimeField}
                        label="End Time"
                        validate={[Validators.required]}
                    />
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
                        validate={[Validators.required, Validators.integerBetween1and50]}
                    />
                </Form>
            </div>
        );
    }
}