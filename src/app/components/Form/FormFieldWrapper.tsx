import * as React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from "react-bootstrap";
import { WrappedFieldProps } from 'redux-form';

export interface FormFieldWrapperProps extends WrappedFieldProps{
    label:string;
    controlId?:string;
}

export default class FormFieldWrapper extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {meta:{touched, error, warning}, label, controlId} = this.props;
        const {children} = this.props;
        const validationState = touched ? (error ? 'error': (warning ? 'warning': undefined)) : undefined;
        
        return (
            <FormGroup validationState={validationState} controlId={controlId}>
                <ControlLabel>{label}</ControlLabel>
                {children} 
                {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <HelpBlock>{warning}</HelpBlock>))}
            </FormGroup>
        );
    }
}