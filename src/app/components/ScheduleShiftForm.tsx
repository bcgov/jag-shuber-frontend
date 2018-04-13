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
    Sheriff,
    TimeType,
    WorkSectionCode
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import toTitleCase from '../infrastructure/toTitleCase';
import CheckboxField from './FormElements/CheckboxField';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';

export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart?: DateType;
    isSingleShift?: boolean;
    shiftTitle?: string;
    assignedSheriff?: Sheriff;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {

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
            minTime = moment().startOf('day').add('hours', 6).toISOString(), 
            maxTime = moment().startOf('day').add('hours', 22).toISOString(),
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
                <br/>
            </div>
        );
    }

    private renderAssignedSheriffs() {
        const { assignedSheriff } = this.props;

        return (
            <div>
                <label>Assigned Sheriff</label><br />
                {assignedSheriff ?
                    <Field
                        name="isSheriffAssigned"
                        component={CheckboxField}
                        label={`${toTitleCase(assignedSheriff.lastName)}, ${assignedSheriff.firstName.charAt(0)}`}
                    /> : 'This shift has not yet been assigned.'}

            </div>
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
                    {isSingleShift && this.renderAssignedSheriffs()}
                </Form>
            </div>
        );
    }
}