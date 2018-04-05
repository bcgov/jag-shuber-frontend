import * as React from 'react';
import * as moment from 'moment';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import TextField from './FormElements/TextField';
import { 
    IdType, 
    TimeType 
} from '../api';
import TimeSliderField from './FormElements/TimeSliderField';

export interface AssignmentDutyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    assignmentTitle?: string;
    assignmentId?: IdType;
    minTime?: TimeType,
    maxTime?: TimeType,
}

export default class AssignmentDutyForm extends
    React.Component<AssignmentDutyFormProps & InjectedFormProps<{}, AssignmentDutyFormProps>, {}> {
    render() {
        const { 
            handleSubmit, 
            assignmentTitle = 'Duty', 
            minTime = moment().startOf('day').add('hours', 7).toISOString(), 
            maxTime = moment().startOf('day').add('hours', 17).toISOString()

        } = this.props;
        return (
            <div>
                <h1>{assignmentTitle}</h1>
                <Form onSubmit={handleSubmit}>
                    <Field  
                        name="timeRange"
                        component={(p) => <TimeSliderField 
                            {...p} 
                            minTime={minTime} 
                            maxTime={maxTime}
                            timeIncrement={30}
                        />}
                        label="Time Range"
                    />
                    <br/>
                    <Field
                        name="sheriffsRequired"
                        component={TextField}
                        label="Number of Sheriffs Required"
                        validate={[Validators.required, Validators.integer]}
                    />
                </Form>
            </div>
        );
    }
}