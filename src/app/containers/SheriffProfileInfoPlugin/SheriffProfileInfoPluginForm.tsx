import React from 'react';
import { SheriffProfilePluginProps } from '../../components/SheriffProfile/SheriffProfilePlugin';
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection';
import * as Validators from '../../infrastructure/Validators';
import SheriffRankSelector from '../CourthouseSheriffRankCodeSelector';
import { Field } from 'redux-form';
import TextField from '../../components/FormElements/TextField';

export default class SheriffProfileInfoPluginForm extends React.PureComponent<SheriffProfilePluginProps> {
    render() {
        return (
            <CollapsibleSection sectionTitle="Identification" isInitiallyCollapsed={false}>
                <Field
                    name="sheriff.firstName"
                    component={TextField as any}
                    label="First Name"
                    validate={[Validators.required]}
                />
                <Field
                    name="sheriff.lastName"
                    component={TextField as any}
                    label="Last Name"
                    validate={[Validators.required]}
                />
                <Field
                    name="sheriff.rankCode"
                    component={SheriffRankSelector as any}
                    label="Rank"
                    validate={[Validators.required]}
                />
                <Field
                    name="sheriff.badgeNo"
                    component={TextField as any}
                    label="Badge Number"
                    validate={[Validators.required]}
                />
                <Field
                    name="sheriff.alias"
                    component={TextField as any}
                    label="Alias"
                />
            </CollapsibleSection>
        );
    }
}