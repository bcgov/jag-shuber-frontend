import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface DateFieldProps {
    defaultValue?: string;
}

export default class DateField extends React.PureComponent<FormFieldWrapperProps & DateFieldProps>{
    render(){
        const {input:{value, onChange}, defaultValue=moment().startOf('day')} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime timeFormat={false} dateFormat="MMM DD YYYY" closeOnSelect={true} value={value} onChange={onChange} defaultValue={defaultValue}/>
            </FormFieldWrapper>
        );
    }
}