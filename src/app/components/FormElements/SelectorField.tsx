import React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';

export interface SelectorFieldProps extends FormFieldWrapperProps {
    SelectorComponent: React.ComponentType<{ value: any, onChange: (v: any)=> void, disabled?: boolean}>;
    disabled?: boolean;
}

export default class SelectorField extends React.PureComponent<FormFieldWrapperProps & SelectorFieldProps> {

    render() {
        const {
            input: { value, onChange },
            showLabel = true,
            disabled = false,
            SelectorComponent
        } = this.props;
        return (
            <FormFieldWrapper {...this.props} showLabel={showLabel}>
                <SelectorComponent value={value} onChange={onChange} disabled={disabled}/>
            </FormFieldWrapper>
        );
    }
}
