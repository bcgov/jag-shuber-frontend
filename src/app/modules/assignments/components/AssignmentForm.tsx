import * as React from 'react'
import { Form } from 'react-bootstrap';
import { 
    Field, 
    InjectedFormProps
} from 'redux-form';
import {
    TextFormField,
    RequiredTrainingChecklist,
    DateTimeField,
    NumberOfSheriffsSelector,
    CheckboxField,
    TextArea
} from '../../../components/Form';
import { Validators } from '../../../infrastructure';

interface GateSecurityFieldsProps{

}
class GateSecurityFields extends React.Component<GateSecurityFieldsProps, any>{
    render() {
        return (
            <div>
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
                <Field name="courtRoom" component={TextFormField} label="Court Room" />
                <Field name="assignmentCourt" component={CheckboxField} value="tesing this value" label="Assignment Court" />
            </div>
        );
    }
}

export interface AssignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    showCourtSecurityFields?: boolean;
    showDocumentSericesFields?: boolean;
    showEscortServicesFields?: boolean;
    showGateSecurityFields?: boolean;
    showOtherAssignmentFields?: boolean;

}

export default class AssignmentForm extends React.Component<AssignmentFormProps & InjectedFormProps<any,AssignmentFormProps>, any>{

    render() {
        const { handleSubmit, showCourtSecurityFields, showDocumentSericesFields, showEscortServicesFields, showGateSecurityFields, showOtherAssignmentFields } = this.props;
        return (
            <div>
                { showCourtSecurityFields && <h1> Court Security </h1> }
                { showDocumentSericesFields && <h1> Document Services </h1> } 
                { showEscortServicesFields && <h1> Escort Services </h1> }
                { showGateSecurityFields && <h1> Gate Security </h1> }
                { showOtherAssignmentFields && <h1> Other Assignment </h1>}
                <Form onSubmit={handleSubmit}>
                    { showCourtSecurityFields && <CourtSecurityFields /> }
                    { showEscortServicesFields && <EscortServiceFields />}
                    { showGateSecurityFields && <GateSecurityFields /> }
                    <Field name="startTime" component={DateTimeField} label="Start Time" validate={[Validators.required]}/>
                    <Field name="endTime" component={DateTimeField} label="End Time" validate={[Validators.required]}/>
                    <Field name="abilities" component={RequiredTrainingChecklist} label="Required Qualifications" />
                    <Field name="sherrifsRequired" component={NumberOfSheriffsSelector} label="Number of Sheriffs Required"/>
                    <Field name="notes" component={TextArea} label="Notes" />
                </Form>
            </div>
        );

    }
}