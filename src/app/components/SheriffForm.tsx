import * as React from 'react';
import {
    Form,
    // Image,
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import TextField from './FormElements/TextField';
import * as Validators from '../infrastructure/Validators';
import SheriffLocationSelector from '../containers/SheriffLocationSelector';

export interface SheriffFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class SheriffForm extends 
    React.Component<SheriffFormProps & InjectedFormProps<{}, SheriffFormProps>, {}> {

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} >
                    {/* <Image responsive={true} src="/img/avatar.png" circle={true} width="150" height="150" />
                    <br /> */}
                    <Field 
                        name="firstName" 
                        component={TextField} 
                        label="First Name" 
                        validate={[Validators.required]} 
                    />
                    <Field 
                        name="lastName" 
                        component={TextField} 
                        label="Last Name" 
                        validate={[Validators.required]} 
                    />
                    <Field 
                        name="rank" 
                        component={TextField} 
                        label="Rank - TO DO add selector" 
                        validate={[Validators.required]} 
                    />
                    <Field 
                        name="badgeNumber" 
                        component={TextField} 
                        label="Badge Number" 
                        validate={[Validators.required]} 
                    />
                    <Field 
                        name="alias" 
                        component={TextField} 
                        label="Alias" 
                    />
                    <Field
                        name="homeCourthouseId"
                        component={SheriffLocationSelector}
                        label="Home Location"
                        validate={[Validators.required]} 
                    />
                </Form>
            </div>
        );
    }
}
