import * as React from 'react';
import * as moment from 'moment';
import {
    Form,
    ListGroup,
    ListGroupItem,
    Button,
    Glyphicon
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps,
    FieldArray
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import * as DateTimeFieldConst from './FormElements/DateTimeFieldConst';
// import TextField from './FormElements/TextField';
import {
    DateType,
    WorkSectionId,
    DaysOfWeek
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import NumberSpinner from './FormElements/NumberSpinner';

interface RecurrenceProps {
    type?: string;
    workSection?: WorkSectionId;
    startTime?: DateType;
    endTime?: DateType;
    days?: DaysOfWeek;
    repeatNumber?: number;
}

class RecurrenceFieldArray extends FieldArray<RecurrenceProps> {

}

export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    // will need to add week start and end here!
    // assignmentTitle?: string;
    // assignmentId?: IdType;
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <RecurrenceFieldArray 
                        name="recurrenceInfo"
                        // validate={}
                        component={(p) => {
                        const { fields } = p;
                        return (
                            <ListGroup >
                                {fields.map((recurrenceInfoFieldName, index) => {
                                    return (
                                        <ListGroupItem key={index}>
                                            <Button 
                                                bsStyle="danger" 
                                                onClick={() => fields.remove(index)} 
                                                className="pull-right"
                                            >
                                                    <Glyphicon glyph="trash"/>
                                            </Button>
                                            <br />
                                            <Field 
                                                name={`${recurrenceInfoFieldName}.workSectionId`}
                                                component={WorkSectionSelector}
                                                label="Work Section"
                                            />
                                            <Field
                                                name={`${recurrenceInfoFieldName}.startTime`}
                                                component={DateTimeFieldConst.TimeField}
                                                label="Start Time"
                                            />
                                            <Field
                                                name={`${recurrenceInfoFieldName}.endTime`}
                                                component={DateTimeFieldConst.TimeField}
                                                label="End Time"
                                            />
                                            <Field
                                                name={`${recurrenceInfoFieldName}.repeatNumber`}
                                                component={NumberSpinner}
                                                label="Number of Shifts" 
                                                validate={[Validators.required, Validators.integer]}
                                            />
                                            <Field
                                                name={`${recurrenceInfoFieldName}.days`}
                                                component={DaysOfWeekChecklist}
                                                label="Days"
                                                // validate={[Validators.required]}
                                            />
                                        </ListGroupItem>
                                    );
                                }
                                )}
                                <br />
                                <Button 
                                    onClick={() => fields.push({
                                        startTime: moment().hour(9).minute(0),
                                        endTime: moment().hour(17).minute(0),
                                        days: DaysOfWeek.Weekdays,
                                        repeatNumber: 1
                                    })} 
                                >
                                    <Glyphicon glyph="plus" />
                                </Button>
                            </ListGroup>
                        );
                    }}
                    />
                </Form>
            </div>
        );
    }
}