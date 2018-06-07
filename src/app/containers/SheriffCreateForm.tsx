import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffProfile/SheriffForm';
import { createSheriff } from '../modules/sheriffs/actions';
import { Sheriff } from '../api/index';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { currentCourthouse } from '../modules/user/selectors';

const formConfig: ConfigProps<any, SheriffFormProps> = {
    form: 'CreateSheriff',
    onSubmit: async (values: Sheriff | any, dispatch, ownProps) => {
        let newSheriff = SheriffForm.parseSheriffFromValues(values);
        await dispatch(createSheriff(newSheriff));
    }
};

const mapStateToProps = (state: RootState, props: SheriffFormProps) => {
    const currentSelectedCourthouse = currentCourthouse(state);
    return {
        initialValues: {
            homeCourthouseId: currentSelectedCourthouse,
            currentCourthouseId: currentSelectedCourthouse
        }
    };
};

export default class SheriffCreateForm extends
    connect<any, {}, SheriffFormProps>
        (mapStateToProps)(reduxForm(formConfig)(SheriffForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}