import * as React from 'react'
import { Form } from 'react-bootstrap';
import { 
    Field, 
    InjectedFormProps
} from 'redux-form';
import {
    TextFormField,
    RequiredTrainingChecklist,
    AssignmentTypeSelector,
    DateTimeField,
    NumberOfSheriffsSelector,
    CheckboxField
} from '../../../components/Form';
import { Validators } from '../../../infrastructure';

interface GateSecurityFieldsProps{

}
class GateSecurityFields extends React.Component<GateSecurityFieldsProps, any>{
    render() {
        return (
            <div>
                <h3>Gate Security Fields</h3>
                <Field name="gateNumber" component={TextFormField} label="Gate Number" />
            </div>
        );
    }
}

interface EscortServiceFieldsProps{

}
class EscortServiceFields extends React.Component<EscortServiceFieldsProps, any>{
    render() {
        return (
            <div>
                <h3>Escort Service Fields</h3>
                <Field name="pickupLocation" component={TextFormField} label="Pick-Up Location" />
                <Field name="dropoffLocation" component={TextFormField} label="Drop-Off Location" />
            </div>
        );
    }
}
interface CourtSecurityFieldsProps{

}

class CourtSecurityFields extends React.Component<CourtSecurityFieldsProps, any>{
    render() {
        return (
            <div>
                <h3>Court Security Fields</h3>
                <Field name="courtRoom" component={TextFormField} label="Court Room" />
                <Field name="assignmentCourt" component={CheckboxField} label="Assignment Court" />
            </div>
        );
    }
}

export interface AssignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class AssignmentForm extends React.Component<AssignmentFormProps & InjectedFormProps<any,AssignmentFormProps>, any>{

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Field name="assignmentType" component={AssignmentTypeSelector} label="Assignment Type"  validate={[Validators.required]} />
                    <Field name="startTime" component={DateTimeField} label="Start Time" validate={[Validators.required]}/>
                    <Field name="endTime" component={DateTimeField} label="End Time" validate={[Validators.required]}/>
                    <Field name="abilities" component={RequiredTrainingChecklist} label="Required Qualifications" />
                    <Field name="sherrifsRequired" component={NumberOfSheriffsSelector} label="Number of Sheriffs Required"/>
                    <Field name="notes" component={TextFormField} label="Notes" />
                    <CourtSecurityFields />
                    <EscortServiceFields />
                    <GateSecurityFields />
                </Form>

            </div>
        );

    }
}