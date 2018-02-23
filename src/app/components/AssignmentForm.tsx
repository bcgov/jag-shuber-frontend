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
import CourtroomSelector from './FormElements/CourtroomSelector';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import JailRolesSelector from './FormElements/JailRoleSelector';
import RunSelector from './FormElements/RunSelector';
import AlternateAssignmentSelector from './FormElements/AlternateAssignmentSelector'
import {
    WORK_SECTIONS,
    DateType
} from '../api';

class OtherFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="alternateAssignmentId" label="Assignment" component={AlternateAssignmentSelector}  validate={[Validators.required]} />
            </div>
        );
    }
}

class EscortsFields extends React.PureComponent<any>{
    render() {
        return (
            <div>
                <Field name="runId" component={RunSelector} label="Assignment" validate={[Validators.required]} /> 
            </div>
        );
    }
}

class JailFeilds extends React.PureComponent{
    render(){
        return (
            <div>
                <Field name="jailRoleId" component={JailRolesSelector} label="Assignment" validate={[Validators.required]} /> 
            </div>
        )
    }
}

class CourtSecurityFields extends React.PureComponent{
    render() {
        return (
            <div>
                <Field name="courtroomId" component={CourtroomSelector} label="Courtroom" validate={[Validators.required]} />
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
        let heading = "Other"
        if (this.props.initialValues && this.props.initialValues) {
            const { workSectionId = "OTHER" } = this.props.initialValues;

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
                case WORK_SECTIONS.OTHER:
                    heading = "Other";
                    break;
            }
        }

        return <h1>{heading}</h1>;
    }

    private renderWorkSectionFields() {
        let returnFields;
        if (this.props.initialValues && this.props.initialValues) {
            const { workSectionId = "OTHER" } = this.props.initialValues;

            switch (WORK_SECTIONS[workSectionId]) {
                case WORK_SECTIONS.COURTS:
                    returnFields = <CourtSecurityFields />;
                    break;
                case WORK_SECTIONS.JAIL: 
                    returnFields = <JailFeilds />
                    break;
                case WORK_SECTIONS.ESCORTS:
                    returnFields = <EscortsFields />;
                    break;
                case WORK_SECTIONS.OTHER:
                    returnFields = <OtherFields />;
                    break;
                default:
                    returnFields = "";
                    break;
            }
        }
        else{
            returnFields="";
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
                                            <Field name={`${recurrenceInfoFieldName}.sheriffsRequired`} component={TextField} label="Number of Sheriffs Required" validate={[Validators.required, Validators.integer]} />
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

    // private renderAssignmentFields() {
    //     const { isDefaultTemplate } = this.props;
    //     return (
    //         <div>
    //             {!isDefaultTemplate &&
    //                 <div>
    //                     <Field name="assignment.startTime" component={DateTimeFieldConst.DateAndTimeField} label="Start Time" validate={[Validators.required]} />
    //                     <Field name="assignment.endTime" component={DateTimeFieldConst.DateAndTimeField} label="End Time" validate={[Validators.required]} />
    //                     <Field name="assignment.abilities" component={RequiredTrainingChecklist} label="Required Qualifications" />
    //                 </div>
    //             }
    //             <Field name="assignment.sherrifsRequired" component={TextField} label="Number of Sheriffs Required" validate={[Validators.required, Validators.integer]} />
    //             {!isDefaultTemplate && <Field name="assignment.notes" component={TextArea} label="Notes" />}
    //         </div>
    //     );
    // }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                {this.renderHeading()}
                <Form onSubmit={handleSubmit}>
                    {this.renderWorkSectionFields()}
                    {/* {this.renderAssignmentFields()} */}
                    {this.renderAssignmentTemplateFields()}
                </Form>
            </div>
        );

    }
}