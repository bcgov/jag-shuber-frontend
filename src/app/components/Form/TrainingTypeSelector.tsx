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
                    <option value="FRO">FRO - Forced Response Option</option>
                    <option value="PISTOL">PISTOL</option>
                    <option value="CID">CID - Critical Incident De-Escalation</option>
                    <option value="CEW">CEW - Conductive Energy Weapon</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}