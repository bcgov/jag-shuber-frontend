import * as React from 'react'
import {
    Form,
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon
} from 'react-bootstrap';
import {
    Field,
    FieldArray,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import TextField from './FormElements/TextField';
import DateTimeField from './FormElements/DateTimeField';
import RequiredTrainingChecklist from './FormElements/RequiredTrainingChecklist';
import TextArea from './FormElements/TextArea';
import CourtroomSelector from './FormElements/CourtroomSelector';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import TimeField from './FormElements/TimeField';

class GateSecurityFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="gateNumber" component={TextField} label="Gate Number" />
            </div>
        );
    }
}


class EscortServiceFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="pickupLocation" component={TextField} label="Pick-Up Location" />
                <Field name="dropoffLocation" component={TextField} label="Drop-Off Location" />
            </div>
        );
    }
}

class CourtSecurityFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="courtRoom" component={CourtroomSelector} label="Courtroom" />
                {/* <Field name="assignmentCourt" component={CheckboxField} label="Assignment Court" /> */}
            </div>
        );
    }
}

interface RecurrenceProps {
    type?: string;
}
class RecurrenceFieldArray extends FieldArray<RecurrenceProps> {

}
export interface AssignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    isDefaultTemplate?: boolean;
    showCourtSecurityFields?: boolean;
    showDocumentSericesFields?: boolean;
    showEscortServicesFields?: boolean;
    showGateSecurityFields?: boolean;
    showOtherAssignmentFields?: boolean;

}

export default class AssignmentForm extends React.Component<AssignmentFormProps & InjectedFormProps<any, AssignmentFormProps>, any>{

    render() {
        const { handleSubmit, showCourtSecurityFields, showDocumentSericesFields, showEscortServicesFields, showGateSecurityFields, showOtherAssignmentFields, isDefaultTemplate } = this.props;
        return (
            <div>
                {showCourtSecurityFields && <h1> Courts</h1>}
                {showDocumentSericesFields && <h1> Document Services </h1>}
                {showEscortServicesFields && <h1> Escorts</h1>}
                {showGateSecurityFields && <h1> Gates</h1>}
                {showOtherAssignmentFields && <h1> Other Assignment </h1>}
                <Form onSubmit={handleSubmit}>
                    {showCourtSecurityFields && <CourtSecurityFields />}
                    {showEscortServicesFields && <EscortServiceFields />}
                    {showGateSecurityFields && <GateSecurityFields />}
                    <Field name="sherrifsRequired" component={TextField} label="Number of Sheriffs Required" validate={[Validators.required, Validators.integer]} />
                    {!isDefaultTemplate &&
                        <div>
                            <Field name="startTime" component={DateTimeField} label="Start Time" validate={[Validators.required]} />
                            <Field name="endTime" component={DateTimeField} label="End Time" validate={[Validators.required]} />
                            <Field name="abilities" component={RequiredTrainingChecklist} label="Required Qualifications" />
                            <Field name="notes" component={TextArea} label="Notes" />
                        </div>
                    }
                    {isDefaultTemplate &&
                        <div>
                            <strong>Days &amp; Times</strong>
                            <RecurrenceFieldArray name="recurrenceInfo" component={(p) => {
                                const { fields } = p;
                                return (
                                    <ListGroup >
                                        {fields.map((recurrenceInfoFieldName, index) => {
                                            return (
                                                <ListGroupItem key={index}>
                                                    <Button bsStyle="danger" onClick={() => fields.remove(index)} className="pull-right"><Glyphicon glyph="trash" /></Button><br />
                                                    <Field name={`${recurrenceInfoFieldName}.days`} component={DaysOfWeekChecklist} label="Days" />
                                                    <Field name={`${recurrenceInfoFieldName}.startTime`} component={TimeField} label="Start Time" />
                                                    <Field name={`${recurrenceInfoFieldName}.endTime`} component={TimeField} label="End Time" />
                                                </ListGroupItem>)
                                        }
                                        )}
                                        <br />
                                        <Button onClick={() => fields.push({})} ><Glyphicon glyph="plus" /></Button>
                                    </ListGroup>
                                )
                            }} />
                        </div>
                    }

                </Form>
            </div>
        );

    }
}