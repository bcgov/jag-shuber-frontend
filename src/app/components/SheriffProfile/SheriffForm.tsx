import React from 'react';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import TextField from './../FormElements/TextField';
import * as Validators from '../../infrastructure/Validators';
import CourthouseSelector from '../../containers/CourthouseSelector';
import { Sheriff } from '../../api/Api';
import SheriffRankSelector from '../../containers/CourthouseSheriffRankCodeSelector';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

export interface SheriffFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class SheriffForm extends
    React.PureComponent<SheriffFormProps & InjectedFormProps<{}, SheriffFormProps>, {}> {

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
                    <CollapsibleSection sectionTitle="Identification" isInitiallyCollapsed={false}>
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
                    </CollapsibleSection>

                    <CollapsibleSection sectionTitle="Location">
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
                            validate={[Validators.required]}
                        />
                    </CollapsibleSection>

                    <CollapsibleSection sectionTitle="Leave">
                        HERE
                    </CollapsibleSection>
                </Form>
            </div>
        );
    }
}
