import * as React from 'react';
import {
    Form,
    ListGroupItem
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import * as DateTimeFieldConst from './FormElements/DateTimeFieldConst';
import {
    DateType,
    Sheriff
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import toTitleCase from '../infrastructure/toTitleCase';
import CheckboxField from './FormElements/CheckboxField';

export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart?: DateType;
    isSingleShift?: boolean;
    shiftTitle?: string;
    assignedSheriff?: Sheriff;
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
        const { isSingleShift } = this.props;
        return (
            <div>
                <Field
                    name="workSectionId"
                    component={WorkSectionSelector}
                    label="Work Section"
                />
                <Field
                    name={isSingleShift ? 'startDateTime' : 'startTime'}
                    component={DateTimeFieldConst.TimeField}
                    label="Start Time"
                    validate={[Validators.required]}
                />
                <Field
                    name={isSingleShift ? 'endDateTime' : 'endTime'}
                    component={DateTimeFieldConst.TimeField}
                    label="End Time"
                    validate={[Validators.required]}
                />
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

    private renderDeleteShiftFields() {
        return (
            <div style={{ color: 'red', fontSize: 14 }}>
                <Field
                    name="shouldDeleteShift"
                    component={CheckboxField}
                    label="Delete this shift"
                />
            </div>
        );
    }

    render() {
        const { handleSubmit, shiftTitle, isSingleShift } = this.props;
        return (
            <div>
                <h1>{shiftTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    <ListGroupItem>
                        {this.renderShiftFields()}
                        {!isSingleShift && this.renderMultiShiftCreationFields()}
                        {isSingleShift && this.renderAssignedSheriffs()}
                    </ListGroupItem>
                    <br/>
                    {isSingleShift &&
                        <ListGroupItem>
                            {this.renderDeleteShiftFields()}
                        </ListGroupItem>}
                </Form>
            </div>
        );
    }
}