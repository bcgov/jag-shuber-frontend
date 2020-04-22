import React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

export interface FormFieldWrapperProps extends WrappedFieldProps {
    style?: ({}); // TODO: Type this better!
    label?: string | React.ReactNode | any;
    placeholder?: string | React.ReactNode | any;
    showLabel?: boolean;
    maxWidth?: number;
    fieldToolTip?: React.ReactNode;
    disabled?: boolean;
}

export default class FormFieldWrapper extends React.PureComponent<FormFieldWrapperProps> {
    render() {
        const { meta: { touched, error, warning }, label, showLabel = true, fieldToolTip } = this.props;
        const { children, style } = this.props;
        const validationState = touched ? (error ? 'error' : (warning ? 'warning' : undefined)) : undefined;

        return (
            <FormGroup
                style={style}
                validationState={validationState}
            >
                {showLabel && <ControlLabel>{label} {fieldToolTip}</ControlLabel>}
                {children}
                {touched && (
                    (error && <HelpBlock>{error}</HelpBlock>) ||
                    (warning && <HelpBlock>{warning}</HelpBlock>)
                )}
            </FormGroup>
        );
    }
}
