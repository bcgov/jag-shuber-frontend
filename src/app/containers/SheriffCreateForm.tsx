import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../modules/sheriffs/actions';
import { Sheriff } from '../api/index';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { RootState } from '../store';
import { connect } from 'react-redux';

const formConfig: ConfigProps<any, SheriffFormProps> = {
    form: 'CreateSheriff',
    onSubmit: (values: Sheriff | any, dispatch, ownProps) => {
        let newSheriff = SheriffForm.parseSheriffFromValues(values);
        dispatch(createSheriff(newSheriff));
    }
};

const mapStateToProps = (state: RootState, props: SheriffFormProps) => {
    return {
       isNewSheriff: true
    };
};

export default class SheriffCreateForm extends
    connect<any, {}, SheriffFormProps>
        (mapStateToProps)(reduxForm(formConfig)(SheriffForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}