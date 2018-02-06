import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


export default class TimeField extends React.PureComponent<FormFieldWrapperProps>{
    onChange(ev:any){
        let newValue = ev;
        if(moment.isMoment(ev)){
            newValue = ev.toISOString();
        }
        this.props.input.onChange(newValue);
    }
    render(){
        const {input:{value, onChange}} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime dateFormat={false} closeOnSelect={true} value={value} onChange={onChange}  />
            </FormFieldWrapper>
        );
    }
}