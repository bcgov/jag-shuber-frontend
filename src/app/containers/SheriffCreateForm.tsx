import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../modules/sheriffs/actions';
import { Sheriff } from '../api/index';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';

const formConfig: ConfigProps<any, SheriffFormProps> = {
    form: 'CreateSheriff',
    onSubmit: (values: Sheriff | any, dispatch, ownProps) => {
        const newSheriff = {...values};
        dispatch(createSheriff(newSheriff));
    }
};

// Here we create a class that extends the configured sheriff form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class SheriffCreateForm extends reduxForm(formConfig)(SheriffForm) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => 
        <FormSubmitButton {...props} formName={formConfig.form} />
}