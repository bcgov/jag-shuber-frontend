import * as React from 'react';
import * as moment from 'moment';
import {
    Form,
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Alert
} from 'react-bootstrap';
import {
    Field,
    FieldArray,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import CourtroomSelector from '../containers/CourthouseCourtroomSelector';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import JailRolesSelector from '../containers/CourthouseJailRoleSelector';
import RunSelector from '../containers/CourthouseRunSelector';
import NumberSpinner from './FormElements/NumberSpinner';
import AlternateAssignmentSelector from '../containers/AlternateAssignmentTypeSelector';
import {
    WORK_SECTIONS,
    TimeType,
    WorkSectionCode,
    DaysOfWeek,
    Assignment
} from '../api';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
class OtherFields extends React.PureComponent {
    render() {
        return (
            <div>
                <Field
                    name="otherAssignmentTypeId"
                    label="Assignment"
                    component={AlternateAssignmentSelector}
                    validate={[Validators.required]}
                />
            </div>
        );
    }
}

class EscortsFields extends React.PureComponent {
    render() {
        return (
            <div>
                <Field
                    name="runId"
                    component={RunSelector}
                    label="Assignment"
                    validate={[Validators.required]}
                />
            </div>
        );
    }
}

class JailFeilds extends React.PureComponent {
    render() {
        return (
            <div>
                <Field
                    name="jailRoleId"
                    component={JailRolesSelector}
                    label="Assignment"
                    validate={[Validators.required]}
                />
            </div>
        );
    }
}

class CourtSecurityFields extends React.PureComponent {
    render() {
        return (
            <div>
                <Field
                    name="courtroomId"
                    component={CourtroomSelector}
                    label="Courtroom"
                    validate={[Validators.required]}
                />
            </div>
        );
    }
}

interface RecurrenceProps {
}
class RecurrenceFieldArray extends FieldArray<RecurrenceProps> {

}

export interface AssignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    isDefaultTemplate?: boolean;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
}

interface AssignmentFormData {
    workSectionId: WorkSectionCode;
    dutyRecurrences: DutyRecurrenceFormData[];
    jailRoleId?: string;
    courtroomId?: string;
    otherAssignmentTypeId?: string;
    runId?: string;
}

interface DutyRecurrenceFormData {
    id?: string;
    daysBitmap: DaysOfWeek;
    sheriffsRequired: number;
    timeRange: {
        startTime: TimeType;
        endTime: TimeType;
    };
}

const TIME_FORMAT = 'HH:mm:ss';

// tslint:disable-next-line:max-line-length
export default class AssignmentForm extends React.Component<AssignmentFormProps & InjectedFormProps<any, AssignmentFormProps>> {

    static parseAssignmentFromValues(values: any): Assignment {
        const { dutyRecurrences = [], ...rest } = (values as AssignmentFormData);
        let assignment: any = { ...rest };
        assignment.dutyRecurrences = dutyRecurrences.map((element) => ({
            id: element.id,
            daysBitmap: element.daysBitmap,
            startTime: moment(element.timeRange.startTime).format(TIME_FORMAT),
            endTime: moment(element.timeRange.endTime).format(TIME_FORMAT),
            sheriffsRequired: element.sheriffsRequired
        }));
        return assignment as Assignment;
    }

    static assignmentToFormValues({ dutyRecurrences = [], ...rest }: Assignment): any {
        return {
            ...rest,
            dutyRecurrences: dutyRecurrences.map(({ startTime, endTime, ...restRecurrence }) => ({
                ...restRecurrence,
                timeRange: {
                    startTime: moment(startTime, TIME_FORMAT).toISOString(),
                    endTime: moment(endTime, TIME_FORMAT).toISOString()
                }
            }))
        }
    }

    private renderHeading() {
        let heading = 'Other';
        if (this.props.initialValues && this.props.initialValues) {
            const { workSectionId = 'OTHER' } = this.props.initialValues;

            switch (WORK_SECTIONS[workSectionId]) {
                case WORK_SECTIONS.COURTS:
                    heading = 'Courts';
                    break;
                case WORK_SECTIONS.JAIL:
                    heading = 'Jail';
                    break;
                case WORK_SECTIONS.ESCORTS:
                    heading = 'Escorts';
                    break;
                case WORK_SECTIONS.OTHER:
                    heading = 'Other';
                    break;
                default:
                    heading = '';
            }
        }

        return <h1>{heading}</h1>;
    }

    private renderWorkSectionFields() {
        let returnFields;
        if (this.props.initialValues && this.props.initialValues) {
            const { workSectionId = 'OTHER' } = this.props.initialValues;

            switch (WORK_SECTIONS[workSectionId]) {
                case WORK_SECTIONS.COURTS:
                    returnFields = <CourtSecurityFields />;
                    break;
                case WORK_SECTIONS.JAIL:
                    returnFields = <JailFeilds />;
                    break;
                case WORK_SECTIONS.ESCORTS:
                    returnFields = <EscortsFields />;
                    break;
                case WORK_SECTIONS.OTHER:
                    returnFields = <OtherFields />;
                    break;
                default:
                    returnFields = '';
                    break;
            }
        } else {
            returnFields = '';
        }
        return returnFields;
    }

    private renderAssignmentTemplateFields() {
        const {
            isDefaultTemplate,
            minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString(),
            maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString(),
            workSectionId = 'OTHER'
        } = this.props;
        if (isDefaultTemplate) {
            return (
                <div>
                    <strong>Days &amp; Times</strong>
                    <RecurrenceFieldArray
                        name="dutyRecurrences"
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
                                                    <Glyphicon glyph="trash" />
                                                </Button>
                                                <br />
                                                <Field
                                                    name={`${recurrenceInfoFieldName}.daysBitmap`}
                                                    component={DaysOfWeekChecklist}
                                                    label="Days"
                                                />
                                                <Field
                                                    name={`${recurrenceInfoFieldName}.timeRange`}
                                                    component={(p) => <TimeSliderField
                                                        {...p}
                                                        minTime={minTime}
                                                        maxTime={maxTime}
                                                        timeIncrement={15}
                                                        color={getWorkSectionColour(workSectionId)}
                                                    />}
                                                    label="Time Range"
                                                />
                                                <br />
                                                <Field
                                                    name={`${recurrenceInfoFieldName}.sheriffsRequired`}
                                                    component={
                                                        (p) => <NumberSpinner 
                                                            {...p}
                                                            maxValue={10}
                                                        />
                                                    }
                                                    label="Number of Sheriffs Required"
                                                    validate={[
                                                        Validators.required, 
                                                        Validators.integer,
                                                        Validators.min1,
                                                        Validators.max10
                                                    ]}
                                                />
                                            </ListGroupItem>
                                        );
                                    }
                                    )}
                                    <br />
                                    <Button
                                        onClick={() => fields.push({
                                            daysBitmap: DaysOfWeek.Weekdays,
                                            timeRange: {
                                                startTime: TimeUtils.getDefaultStartTime().toISOString(),
                                                endTime: TimeUtils.getDefaultStartTime().toISOString()
                                            }
                                        })}
                                    >
                                        <Glyphicon glyph="plus" />
                                    </Button>
                                </ListGroup>
                            );
                        }}
                    />
                </div>
            );
        }
        return '';
    }

    render() {
        const { handleSubmit, error } = this.props;
        return (
            <div>
                {error && (
                    <Alert bsStyle="danger">
                        <p>{error}</p>
                    </Alert>
                )}
                {this.renderHeading()}
                <Form onSubmit={handleSubmit}>
                    {this.renderWorkSectionFields()}
                    {this.renderAssignmentTemplateFields()}
                </Form>
            </div>
        );
    }
}