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
// import * as Validators from '../infrastructure/Validators';

export interface ScheduleShiftCopyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    copyWeekStart: DateType;
    createWeekStart: DateType;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftCopyFormProps & InjectedFormProps<{}, ScheduleShiftCopyFormProps>, {}> {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <h3>From the previous week, copy:</h3> 
                    <label>
                        <Field name="copySelection" checked="true" component="input" type="radio" value="shiftsOnly" />
                        {' '} Shifts Only 
                    </label>
                    <br/>
                    <label>
                        <Field name="copySelection" component="input" type="radio" value="shiftsAndSheriffs" />
                        {' '} Shifts and Sheriffs 
                    </label>
                </Form>
            </div>
        );
    }
}