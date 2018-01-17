import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapperNoControlLabel, FormFieldWrapperNoControlLabelProps } from './FormFieldWrapperNoControlLabel';


export default class BootstrapCheckboxField extends React.PureComponent<FormFieldWrapperNoControlLabelProps>{
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