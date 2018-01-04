import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import { Validators } from '../../../infrastructure';
import { TextFormField, QualificationsChecklist } from '../../../components/Form';


export interface SheriffFormProps {
    handleSubmit:()=>void;
}


export default class SheriffForm extends React.Component<SheriffFormProps, any>{

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <h2>Add a Sheriff</h2>
                <Form onSubmit={handleSubmit}>
                    <Field name="name" component={TextFormField} label="Name"/>
                    <Field name="badgeNumber" component={TextFormField} label="Badge Number" validate={[Validators.number]} />
                    <Field name="abilities" component={QualificationsChecklist} label="Qualifications" validate={[Validators.required]}/> 
                    <button type="submit">Save</button>
                </Form>
            </div>
        );


    }
}
