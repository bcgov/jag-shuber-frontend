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
    DateType
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';

export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart?: DateType;
    isSingleShift?: boolean;
    shiftTitle?: string;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {

    private renderMultiShiftCreationFields() {
        const { isSingleShift } = this.props;
        if (!isSingleShift) {
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
        return '';
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

    render() {
        const { handleSubmit, shiftTitle } = this.props;
        return (
            <div>
                <h1>{shiftTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    {this.renderShiftFields()}
                    {this.renderMultiShiftCreationFields()}
                </Form>
            </div>
        );
    }
}