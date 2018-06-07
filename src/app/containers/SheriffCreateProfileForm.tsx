import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { 
    default as SheriffProfileForm, 
    SheriffProfileFormProps 
} from '../components/SheriffProfile/SheriffProfileForm';
import { createSheriff } from '../modules/sheriffs/actions';
import { Sheriff } from '../api/index';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { currentCourthouse } from '../modules/user/selectors';

const formConfig: ConfigProps<any, SheriffProfileFormProps> = {
    form: 'CreateSheriff',
    onSubmit: async (values: Sheriff | any, dispatch, ownProps) => {
        let newSheriff = SheriffProfileForm.parseSheriffFromValues(values);
        await dispatch(createSheriff(newSheriff));
    }
};

const mapStateToProps = (state: RootState, props: SheriffProfileFormProps) => {
    const currentSelectedCourthouse = currentCourthouse(state);
    return {
        initialValues: {
            homeCourthouseId: currentSelectedCourthouse,
            currentCourthouseId: currentSelectedCourthouse
        }
    };
};

export default class SheriffCreateProfileForm extends
    connect<any, {}, SheriffProfileFormProps>
        (mapStateToProps)(reduxForm(formConfig)(SheriffProfileForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}