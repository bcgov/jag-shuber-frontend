import * as React from 'react';
import * as moment from 'moment';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps,
    FieldArray,
    formValues
} from 'redux-form';
// import * as Validators from '../infrastructure/Validators';
// import TextField from './FormElements/TextField';
import {
    IdType,
    TimeType,
    WorkSectionCode,
    AssignmentDuty
} from '../api';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';
import {
    ListGroup,
    ListGroupItem,
    Button,
    Glyphicon
} from 'react-bootstrap';

export interface AssignmentDutyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    assignmentTitle?: string;
    assignmentId?: IdType;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
}

interface SheriffDutyFieldProps {

}

class SheriffDutyFieldArray extends FieldArray<SheriffDutyFieldProps> {

}

export default class AssignmentDutyForm extends
    React.Component<AssignmentDutyFormProps & InjectedFormProps<{}, AssignmentDutyFormProps>, {}> {

    static parseAssignmentDutyFromValues(values: any): AssignmentDuty {
        const { timeRange: { startTime, endTime }, ...rest } = values;
        const updatedAssignmentDuty = { ...rest };
        updatedAssignmentDuty.startDateTime = startTime;
        updatedAssignmentDuty.endDateTime = endTime;
        return updatedAssignmentDuty as AssignmentDuty;
    }

    static assignmentDutyToFormValues(duty: AssignmentDuty) {
        return {
            ...duty,
            timeRange: {
                startTime: moment(duty.startDateTime).toISOString(),
                endTime: moment(duty.endDateTime).toISOString()
            }
        };
    }

    renderSheriffDutyFields(): React.ComponentClass {
        const {
            // workSectionId,
            // minTime = moment().startOf('day').add(7, 'hours').toISOString(),
            // maxTime = moment().startOf('day').add(17, 'hours').toISOString()
        } = this.props;

        return formValues('timeRange')((props: any) => {
            const {
                timeRange: {
                    startTime: minTime = moment().startOf('day').add(7, 'hours').toISOString(),
                endTime: maxTime = moment().startOf('day').add(17, 'hours').toISOString()
                }
            } = props;
            return (
                <SheriffDutyFieldArray
                    name="sheriffDuties"
                    component={(p) => {
                        const { fields } = p;
                        return (
                            <ListGroup >
                                {fields.map((fieldInstanceName, index) => {
                                    return (
                                        <ListGroupItem key={index}>
                                            <Button
                                                bsStyle="danger"
                                                onClick={() => fields.remove(index)}
                                                className="pull-right"
                                            >
                                                <Glyphicon glyph="trash" />
                                            </Button>
                                            <div style={{marginTop:20}}>
                                            <Field
                                                name={`${fieldInstanceName}.timeRange`}
                                                component={(p) => <TimeSliderField
                                                    {...p}
                                                    minTime={minTime}
                                                    maxTime={maxTime}
                                                    timeIncrement={15}
                                                    color={'#888'}
                                                />}
                                                label={`Sheriff ${index + 1}`}
                                            />
                                            </div>
                                        </ListGroupItem>
                                    );
                                }
                                )}
                                <br />
                                <Button 
                                    onClick={() => fields.push({
                                        timeRange: {
                                            startTime: minTime,
                                            endTime: maxTime
                                        }
                                    })} 
                                >
                                    <Glyphicon glyph="plus" />
                                </Button>
                            </ListGroup>
                        );
                    }}
                />
            )
        });
    }

    render() {
        const {
            handleSubmit,
            assignmentTitle = 'Duty',
            minTime = moment().startOf('day').add('hours', 6).toISOString(),
            maxTime = moment().startOf('day').add('hours', 22).toISOString(),
            workSectionId = 'OTHER'
        } = this.props;
        const RenderFields = this.renderSheriffDutyFields();
        return (
            <div>
                <h1 style={{ marginBottom: 20 }}>{assignmentTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    <Field
                        name="timeRange"
                        component={(p) => <TimeSliderField
                            {...p}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeIncrement={15}
                            color={getWorkSectionColour(workSectionId)}
                            label={<h2 style={{marginBottom:5}}>Duty Time Range</h2>}
                        />}
                    />
                    <div style={{ marginTop: 40 }}>
                        <h2>Sheriffs for Duty</h2>
                        <RenderFields />
                    </div>
                </Form>
            </div>
        );
    }
}