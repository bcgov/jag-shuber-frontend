import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';


export default class QualificationsChecklist extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <Checkbox onChange={onChange} value={value}>
                    Transfers
                </Checkbox>
                {' '}
                <Checkbox onChange={onChange} value={value}>
                    Court Appearances
                </Checkbox>
                {' '}
                <Checkbox onChange={onChange} value={value}>
                    Sign Documents
                </Checkbox>
                {' '}
            </FormFieldWrapper>

        );
    }
}