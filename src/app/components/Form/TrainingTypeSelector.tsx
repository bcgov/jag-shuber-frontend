import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';


export default class TrainingTypeSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No training type selected">{`Select ${label}`}</option>
                    <option value="firearms">Firearms</option>
                    <option value="escort">Prisoner Escort</option>
                    <option value="seucrity">Court Security</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}