import * as React from 'react'
import { Form, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Field, WrappedFieldProps } from 'redux-form';
import { Panel } from 'react-bootstrap';
import QualificationsChecklist from '../../../components/QualificationsChecklist';

export interface TaskFormProps {
   handleSubmit:()=>void;
}

class BootstrapTextField extends React.PureComponent<WrappedFieldProps & {label:string}>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormGroup /*validationState='success'*/>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type="text" placeholder={`Enter ${label}`} value={value} onChange={onChange} />
            </FormGroup>
        );
    }
}

class BootstrapDropdownList extends React.PureComponent<WrappedFieldProps & {label:string}>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No task type selected">{`Select ${label}`}</option>
                    <option value="Court Security">Court Security</option>
                    <option value="Escort Services">Escort Services</option>
                    <option value="Document Services">Document Services</option>
                </FormControl>
            </FormGroup>
        );
    }
}


export default class TaskForm extends React.Component<TaskFormProps, any>{

    render() {
       const {handleSubmit} = this.props;

        return (
            <div>
                <h1> Add a New Task </h1>
                <Panel>
                <Form onSubmit={handleSubmit}>
                    <Field name="id" component={BootstrapTextField} label="Task ID (temporary field)"/>
                    <Field name="title" component={BootstrapDropdownList} label="Task Type"/>
                    <Field name="description" component={BootstrapTextField} label="Details"/>
                    <Field name="abilities" component={QualificationsChecklist} label="Required Qualifications"/> 
                    <button type="submit">Create Task</button>
                </Form>
                </Panel>
            </div>
        );


    }
}