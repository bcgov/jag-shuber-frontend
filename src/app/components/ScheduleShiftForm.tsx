import * as React from 'react';
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
    Sheriff
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import toTitleCase from '../infrastructure/toTitleCase';
import CheckboxField from './FormElements/CheckboxField';
import { Glyphicon } from 'react-bootstrap';

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
        const { isSingleShift, assignedSheriff } = this.props;

        if (isSingleShift) {
            if (assignedSheriff) {
                return (
                    <div>
                        <label>Assigned Sheriff</label><br />
                        <Field
                            name="isSheriffAssigned"
                            component={CheckboxField}
                            label={`${toTitleCase(assignedSheriff.lastName)}, ${assignedSheriff.firstName.charAt(0)}`}
                        />
                    </div>
                );
            } else {
                return (
                    <div style={{color: 'darkorange', fontSize: 16}}>
                       <Glyphicon glyph="alert" /> Shift has not been assigned
                    </div>
                );
            }
        }
        return '';
    }

    render() {
        const { handleSubmit, shiftTitle, isSingleShift } = this.props;
        return (
            <div>
                <h1>{shiftTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    {this.renderShiftFields()}
                    {!isSingleShift && this.renderMultiShiftCreationFields()}
                    {this.renderAssignedSheriffs()}
                </Form>
            </div>
        );
    }
}