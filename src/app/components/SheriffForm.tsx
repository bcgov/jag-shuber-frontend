import * as React from 'react';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import TextField from './FormElements/TextField';
import * as Validators from '../infrastructure/Validators';
import SheriffLocationSelector from '../containers/SheriffLocationSelector';
import { Sheriff } from '../api/Api';

export interface SheriffFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    isNewSheriff?: boolean;
}

export default class SheriffForm extends
    React.Component<SheriffFormProps & InjectedFormProps<{}, SheriffFormProps>, {}> {

    static parseSheriffFromValues(values: any): Sheriff {
        const sheriff = { ...values };
        return sheriff as Sheriff;
    }

    render() {
        const { handleSubmit, isNewSheriff = false } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} >
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
                        name="rankCode"
                        component={TextField}
                        label="Rank - TO DO add selector"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="badgeNo"
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

                {isNewSheriff && 'new sheriff'}
                {!isNewSheriff && 'existing sheriff'}
            </div>
        );
    }
}
