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
import TextField from './FormElements/TextField';


export interface AssignmentDutyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}


export default class AssignmentDutyForm extends React.Component<AssignmentDutyFormProps & InjectedFormProps<any, AssignmentDutyFormProps>, any>{
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h1>Duty</h1>
                <Form onSubmit={handleSubmit}>
                    <Field name="startDateTime" component={DateTimeFieldConst.TimeField} label="Start Time" />
                    <Field name="endDateTime" component={DateTimeFieldConst.TimeField} label="End Time" />
                    <Field name="sheriffsRequired" component={TextField} label="Number of Sheriffs Required" validate={[Validators.required, Validators.integer]} />
                </Form>
            </div>
        );
    }
}