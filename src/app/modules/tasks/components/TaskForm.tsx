import * as React from 'react'
import { Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import { Panel } from 'react-bootstrap';
import { required } from '../../../infrastructure/Validators';
import { TextFormField, QualificationsChecklist, TaskTypeSelector } from '../../../components/Form';

export interface TaskFormProps {
   handleSubmit:()=>void;
}

export default class TaskForm extends React.Component<TaskFormProps, any>{

    render() {
       const {handleSubmit} = this.props;

        return (
            <div>
                <h1> Add a New Task </h1>
                <Panel>
                <Form onSubmit={handleSubmit}>
                    <Field name="id" component={TextFormField} label="Task ID (temporary field)" validate={[required]}/>
                    <Field name="title" component={TaskTypeSelector} label="Task Type"/>
                    <Field name="description" component={TextFormField} label="Details"/>
                    <Field name="abilities" component={QualificationsChecklist} label="Required Qualifications"/> 
                    <button type="submit">Create Task</button>
                </Form>
                </Panel>
            </div>
        );


    }
}