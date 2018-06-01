import * as React from 'react';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import {
    DateType
} from '../api/Api';
import CheckboxField from './FormElements/CheckboxField';

export interface ScheduleShiftCopyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStartSource: DateType;
    weekStartDestination: DateType;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftCopyFormProps & InjectedFormProps<{}, ScheduleShiftCopyFormProps>, {}> {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <h3>Duplicate Shifts from Previous Week</h3>
                    <Field
                        name="shouldIncludeSheriffs"
                        component={CheckboxField as any}
                        label="Include sheriffs"
                    />
                </Form>
            </div>
        );
    }
}