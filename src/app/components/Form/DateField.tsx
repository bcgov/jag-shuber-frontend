import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';




export default class DateField extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime timeFormat={false} dateFormat="DD-MMM-YYYY"  value={value} onChange={onChange}/>
            </FormFieldWrapper>
        );
    }
}