import * as React from 'react'
import { 
    Form,
    ControlLabel,
    FormControl,
    FormGroup 
} from 'react-bootstrap';
import { 
   Field,
   WrappedFieldProps
} from 'redux-form';

export interface SheriffFormProps {
    handleSubmit:()=>void;
}

class BootstrapTextField extends React.PureComponent<WrappedFieldProps & {label:string}>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormGroup validationState='success'>
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
                    <Field name="firstName" component={BootstrapTextField} label="First Name"/>
                    <Field name="lastName" component={BootstrapTextField} label="Last Name"/>
                    <Field name="email" component={BootstrapTextField} label="Email"/>                    
                    <button type="submit">Submit</button>
                </Form>
            </div>
        );


    }
}
