import * as React from 'react';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { SheriffAssignment, SheriffAbility, WORK_SECTIONS } from '../api/index';
import { createAssignment } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = { 
    form: 'CreateAssignment',
    onSubmit: (values:SheriffAssignment|any, dispatch, props) =>{
        const { showCourtSecurityFields, showEscortServicesFields, showDocumentSericesFields, showGateSecurityFields } = props;
        let assignmentType = "";
        if(showCourtSecurityFields){
            assignmentType = WORK_SECTIONS.courtSecurity;
        }else if(showEscortServicesFields){
            assignmentType = WORK_SECTIONS.escortServices;
        }else if(showDocumentSericesFields){
            assignmentType = WORK_SECTIONS.documentServices;
        }else if (showGateSecurityFields){
            assignmentType = WORK_SECTIONS.gateSecurity;
        }else{
            assignmentType = WORK_SECTIONS.other;
        }

        let newAssignment = Object.assign({}, values, {requiredAbilities:SheriffAbility.All}, {sheriffIds:[]}, {assignmentType: assignmentType});
        dispatch(createAssignment(newAssignment));
    } 
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class CreateAssignmentForm extends reduxForm(formConfig)(AssignmentForm){
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




