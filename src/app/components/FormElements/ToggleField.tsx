import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import Toggle from '../Toggle/Toggle';

export default class ToggleField extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <Toggle
                    defaultChecked={value}                    
                    onChange={() => onChange(!value)}
                    checkedLabel={''}
                    uncheckedLabel={''}
                />
            </FormFieldWrapper>
        );
    }
}