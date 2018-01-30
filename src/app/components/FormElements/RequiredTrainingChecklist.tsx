import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { TRAINING_TYPES } from '../../api';



export default class RequiredTrainingChecklist extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { onChange } } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                {Object.keys(TRAINING_TYPES).map((k, i) =>
                    <Checkbox onChange={onChange} value={k}>{TRAINING_TYPES[k]}</Checkbox>)}
            </FormFieldWrapper>

        );
    }
}