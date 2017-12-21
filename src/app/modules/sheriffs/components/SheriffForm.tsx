import * as React from 'react'
import { Form, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Field, WrappedFieldProps } from 'redux-form';
import QualificationsChecklist from '../../../components/QualificationsChecklist';
export interface SheriffFormProps {
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

class BootstrapNumberField extends React.PureComponent<WrappedFieldProps & {label:string}>{
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

export default class SheriffForm extends React.Component<SheriffFormProps, any>{

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <h2>Add a Sheriff</h2>
                <Form onSubmit={handleSubmit}>
                    <Field name="name" component={BootstrapTextField} label="Name"/>
                    <Field name="badgeNumber" component={BootstrapNumberField} label="Badge Number"/>
                    <Field name="abilities" component={QualificationsChecklist} label="Qualifications"/> 
                    <button type="submit">Save</button>
                </Form>
            </div>
        );


    }
}
