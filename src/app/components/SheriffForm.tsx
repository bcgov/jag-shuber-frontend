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
import SheriffRankSelector from '../containers/CourthouseSheriffRankCodeSelector';

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
        const { handleSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} >
                    <Field
                        name="firstName"
                        component={(p) => <TextField {...p} />}
                        label="First Name"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="lastName"
                        component={(p) => <TextField {...p} />}
                        label="Last Name"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="rankCode"
                        component={(p) => <SheriffRankSelector {...p}/>}
                        label="Rank"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="badgeNo"
                        component={(p) => <TextField {...p}/>}
                        label="Badge Number"
                        validate={[Validators.required]}
                    />
                    <Field
                        name="alias"
                        component={(p) => <TextField {...p}/>}
                        label="Alias"
                    />
                    <Field
                        name="homeCourthouseId"
                        component={(p) => <SheriffLocationSelector {...p}/>}
                        label="Home Location"
                        validate={[Validators.required]}
                    />
                </Form>
            </div>
        );
    }
}
