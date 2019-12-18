import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';

export default class TextField extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: {value, onChange}, label, placeholder } = this.props;

        const placeholderValue = (placeholder) ? placeholder : `Enter ${label}`;

        return (
            <FormFieldWrapper {...this.props}>
                <FormControl type="text" placeholder={placeholderValue} value={value} onChange={onChange} />
            </FormFieldWrapper>
        );
    }
}
