import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapperNoControlLabel, FormFieldWrapperProps } from './FormFieldWrapperNoControlLabel';


export default class BootstrapCheckboxField extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapperNoControlLabel {...this.props}>
                <Checkbox onChange={onChange} value={value}>
                    {label}
                </Checkbox>
            </FormFieldWrapperNoControlLabel>

        );
    }
}