import * as React from 'react'
import { reduxForm } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../actions';
import { SheriffAbility, Sheriff } from '../../../api/index';
import {default as FormSubmitButton,SubmitButtonProps} from '../../../components/Form/SubmitButton'


// wrapping generic sheriff form in redux-form
const CreateSheriffForm = reduxForm<SheriffFormProps, any>({ 
    form: 'CreateSheriff',  
    onSubmit: (values:Sheriff|any, dispatch, props)=>{ 
        let newSherrif = Object.assign({},values, {abilities:SheriffAbility.All});
        dispatch(createSheriff(newSherrif));
    },
    onSubmitSuccess: (result,dispatch,props)=>{
        const {onSubmitSuccess} = props;
        if(onSubmitSuccess){
            onSubmitSuccess();
        }
    }
})(SheriffForm);

export const SubmitButton = (props:Partial<SubmitButtonProps>)=><FormSubmitButton {...props} formName="CreateSheriff" />;

export default CreateSheriffForm;