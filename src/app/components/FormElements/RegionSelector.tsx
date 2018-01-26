import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';


export default class RegionSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No region selected">{`Select ${label}`}</option>
                    <option value="Fraser">Fraser</option>
                    <option value="Interior">Interior</option>
                    <option value="Northern">Northern</option>
                    <option value="Van Centre">Van Centre</option>
                    <option value="Vancouver Island">Vancouver Island</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}