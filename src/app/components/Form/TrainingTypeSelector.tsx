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
                    <option value="fro">FRO - Forced Response Option</option>
                    <option value="pistol">PISTOL</option>
                    <option value="cid">CID - Critical Incident De-Escalation</option>
                    <option value="cew">CEW - Conductive Energy Weapon</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}