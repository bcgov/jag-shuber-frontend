import * as React from 'react';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import TextField from './FormElements/TextField';
import * as Validators from '../infrastructure/Validators';
import CourthouseSelector from '../containers/CourthouseSelector';
import { Sheriff } from '../api/Api';
import SheriffRankSelector from '../containers/CourthouseSheriffRankCodeSelector';
import Form from './FormElements/Form';

export interface SheriffFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class SheriffForm extends
    React.Component<SheriffFormProps & InjectedFormProps<{}, SheriffFormProps>, {}> {
    static parseSheriffFromValues(values: any): Sheriff {
        return { ...values } as Sheriff;
    }

    static sheriffToFormValues(sheriff: Sheriff): any {
        return { ...sheriff };
    }

    render() {
        return (
            <Form {...this.props} >
                <Field
                    name="firstName"
                    component={TextField as any}
                    label="First Name"
                    validate={[Validators.required]}
                />
                <Field
                    name="lastName"
                    component={TextField as any}
                    label="Last Name"
                    validate={[Validators.required]}
                />
                <Field
                    name="rankCode"
                    component={SheriffRankSelector as any}
                    label="Rank"
                    validate={[Validators.required]}
                />
                <Field
                    name="badgeNo"
                    component={TextField as any}
                    label="Badge Number"
                    validate={[Validators.required]}
                />
                <Field
                    name="alias"
                    component={TextField as any}
                    label="Alias"
                />
                <Field
                    name="homeCourthouseId"
                    component={CourthouseSelector as any}
                    label="Home Location"
                    validate={[Validators.required]}
                />
                <Field
                    name="currentCourthouseId"
                    component={CourthouseSelector as any}
                    label="Current Location"
                />
            </Form>
        );
    }
}
