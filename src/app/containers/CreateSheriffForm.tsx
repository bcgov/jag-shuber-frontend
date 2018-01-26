import * as React from 'react'
import { reduxForm, ConfigProps } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../modules/sheriffs/actions';
import { SheriffAbility, Sheriff } from '../api/index';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/Form/SubmitButton'



const formConfig: ConfigProps<any,SheriffFormProps> = {
    form: 'CreateSheriff',
    onSubmit: (values: Sheriff | any, dispatch, ownProps) => {
        let newSherrif = Object.assign({}, values, { abilities: SheriffAbility.All });
        dispatch(createSheriff(newSherrif));
    }
}; 

// Here we create a class that extends the configured sheriff form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class CreateSheriffForm extends reduxForm(formConfig)(SheriffForm){
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}