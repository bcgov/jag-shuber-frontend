import * as React from 'react';
import { FormGroup, HelpBlock } from "react-bootstrap";
import { WrappedFieldProps } from 'redux-form';

export interface FormFieldWrapperNoControlLabelProps extends WrappedFieldProps{
    label:string;
}

export default class FormFieldWrapperNoControlLabel extends React.PureComponent<FormFieldWrapperNoControlLabelProps>{
    render(){
        const {meta:{touched, error, warning}} = this.props;
        const {children} = this.props;
        const validationState = touched ? (error ? 'error': (warning ? 'warning': undefined)) : undefined;
        
        return (
            <FormGroup validationState={validationState}>
                {children} 
                {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <HelpBlock>{warning}</HelpBlock>))}
            </FormGroup>
        );
    }
}