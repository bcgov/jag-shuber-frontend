import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { TRAINING_TYPES } from '../../api';


export default class RequiredTrainingChecklist extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <Checkbox onChange={onChange} value={value}>
                    {TRAINING_TYPES.CEW}
                </Checkbox>
                
                <Checkbox onChange={onChange} value={value}>
                    {TRAINING_TYPES.CID}
                </Checkbox>
                
                <Checkbox onChange={onChange} value={value}>
                    {TRAINING_TYPES.FRO}
                </Checkbox>

                <Checkbox onChange={onChange} value={value}>
                    {TRAINING_TYPES.PISTOL}
                </Checkbox>
                
            </FormFieldWrapper>

        );
    }
}