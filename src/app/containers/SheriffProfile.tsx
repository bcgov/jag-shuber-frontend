import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SheriffProfileComponent, { SheriffProfileProps } from '../components/SheriffProfile/SheriffProfile';
import { RootState } from '../store';
import { getSheriff } from '../modules/sheriffs/selectors';
import SheriffProfilePluginIdentification from './SheriffProfilePluginIdentification';
import SheriffProfilePluginHeader from './SheriffProfilePluginHeader';
import SheriffProfilePluginLocation from './SheriffProfilePluginLocation';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { Sheriff } from '../api';
import { updateSheriff } from '../modules/sheriffs/actions';
import { Dispatch } from 'redux';

interface SheriffProfileStateProps {    

}

const formConfig = {
    form: 'SheriffProfile',
    onSubmit: async (values: any, dispatch: Dispatch<any>, { sheriffId, plugins = [] }: SheriffProfileProps) => {
        const { sheriff }: { sheriff: Partial<Sheriff> } = values;
        if (sheriff.id) {
            const updatedSheriff = await dispatch(updateSheriff(sheriff));
            console.log(updatedSheriff);
            // await Promise.all(
            //     plugins.map(p => p.update(sheriffId, values))
            // );
        } else {
            alert('Creating sheriff');
        }
        alert(`${sheriffId ? 'Editing' : 'Creating'} Sheriff with ${plugins} plugins`);
    },
}

// Wire up the Form to redux Form
const SheriffProfileForm = reduxForm<any, SheriffProfileProps>(formConfig)(SheriffProfileComponent);

export default class extends connect<SheriffProfileStateProps, {}, SheriffProfileProps, RootState>(
    (state, { sheriffId, plugins = [] }) => {
        const initialValues = plugins
            .map(p => p.getData(sheriffId, state))
            .filter(s => s != undefined)
            .reduce((initValues, val) => {
                return { ...initValues, ...val };
            }, { sheriff: getSheriff(sheriffId)(state) });

        return {
            initialValues
        };
    }
)(SheriffProfileForm as any) {
    static defaultProps: Partial<SheriffProfileProps & { children?: React.ReactNode }> = {
        plugins: [
            new SheriffProfilePluginHeader(),
            new SheriffProfilePluginIdentification(),
            new SheriffProfilePluginLocation()
        ]
    };

    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
