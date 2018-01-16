import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';


export default class BootstrapCheckboxField extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <Checkbox onChange={onChange} value={value}>
                    {label}
                </Checkbox>
            </FormFieldWrapper>

        );
    }
}