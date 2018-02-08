import * as React from 'react';
import * as moment from 'moment';
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
import * as DateTimeFieldConst from './FormElements/DateTimeFieldConst';
import RequiredTrainingChecklist from './FormElements/RequiredTrainingChecklist';
import TextArea from './FormElements/TextArea';
import CourtroomSelector from './FormElements/CourtroomSelector';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import {
    WORK_SECTIONS,
    DateType
} from '../api';

class GateSecurityFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="assignment.gateNumber" component={TextField} label="Gate Number" />
            </div>
        );
    }
}


class EscortServiceFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="assignment.pickupLocation" component={TextField} label="Pick-Up Location" />
                <Field name="assignment.dropoffLocation" component={TextField} label="Drop-Off Location" />
            </div>
        );
    }
}

class CourtSecurityFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="assignment.courtroomId" component={CourtroomSelector} label="Courtroom"  validate={[Validators.required]}/>
            </div>
        );
    }
}

interface RecurrenceProps {
    type?: string;
    startTime?: DateType;
    endTime?: DateType;
}
class RecurrenceFieldArray extends FieldArray<RecurrenceProps> {

}

export interface AssignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    isDefaultTemplate?: boolean;
    workSectionId?: string;
}


export default class AssignmentForm extends React.Component<AssignmentFormProps & InjectedFormProps<any, AssignmentFormProps>, any>{
    private renderHeading() {
        const { workSectionId = "OTHER" } = this.props.initialValues.assignment;
        let heading = "Other"
        switch (WORK_SECTIONS[workSectionId]) {
            case WORK_SECTIONS.COURTS:
                heading = "Courts";
                break;
            case WORK_SECTIONS.JAIL:
                heading = "Jail";
                break;
            case WORK_SECTIONS.ESCORTS:
                heading = "Escorts";
                break;
            case WORK_SECTIONS.GATES:
                heading = "Gates";
                break;
            case WORK_SECTIONS.DOCUMENTS:
                heading = "Document Service";
                break;
        }
        return <h1>{heading}</h1>;
    }

    private renderWorkSectionFields() {
        const { workSectionId = "OTHER" } = this.props.initialValues.assignment;
        let returnFields;
        switch (WORK_SECTIONS[workSectionId]) {
            case WORK_SECTIONS.COURTS:
                returnFields = <CourtSecurityFields />;
                break;
            case WORK_SECTIONS.ESCORTS:
                returnFields = <EscortServiceFields />;
                break;
            case WORK_SECTIONS.GATES:
                returnFields = <GateSecurityFields />;
                break;
            default:
                returnFields = "";
                break;
        }
        return returnFields;
    }

    private renderAssignmentTemplateFields() {
        const { isDefaultTemplate } = this.props;
        if (isDefaultTemplate) {
            return (
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
                                            <Field name={`${recurrenceInfoFieldName}.startTime`} component={DateTimeFieldConst.TimeField} label="Start Time" />
                                            <Field name={`${recurrenceInfoFieldName}.endTime`} component={DateTimeFieldConst.TimeField} label="End Time" />
                                        </ListGroupItem>)
                                }
                                )}
                                <br />
                                <Button onClick={() => fields.push({
                                     startTime: moment().hour(9).minute(0), 
                                     endTime: moment().hour(17).minute(0)
                                    })} >
                                    <Glyphicon glyph="plus" />
                                </Button>
                            </ListGroup>
                        )
                    }} />
                </div>

            )
        }
        return "";
    }

    private renderAssignmentFields() {
        const { isDefaultTemplate } = this.props;
        return (
            <div>
                {!isDefaultTemplate &&
                    <div>
                        <Field name="assignment.startTime" component={DateTimeFieldConst.DateAndTimeField} label="Start Time" validate={[Validators.required]} />
                        <Field name="assignment.endTime" component={DateTimeFieldConst.DateAndTimeField} label="End Time" validate={[Validators.required]} />
                        <Field name="assignment.abilities" component={RequiredTrainingChecklist} label="Required Qualifications" />
                    </div>
                }
                <Field name="assignment.sherrifsRequired" component={TextField} label="Number of Sheriffs Required" validate={[Validators.required, Validators.integer]} />
                {!isDefaultTemplate && <Field name="assignment.notes" component={TextArea} label="Notes" />}
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                {this.renderHeading()}
                <Form onSubmit={handleSubmit}>
                    {this.renderWorkSectionFields()}
                    {this.renderAssignmentFields()}
                    {this.renderAssignmentTemplateFields()}
                </Form>
            </div>
        );

    }
}