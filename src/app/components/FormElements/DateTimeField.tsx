import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface DateTimeFieldProps{
    showDate?: boolean;
    showTime?: boolean;
    closeOnSelect?: boolean;
}

export default class DateTimeField extends React.PureComponent<FormFieldWrapperProps & DateTimeFieldProps>{
    onChange(ev:any){
        let newValue = ev;
        if(moment.isMoment(ev)){
            newValue = ev.toISOString();
        }
        this.props.input.onChange(newValue);
    }

    render(){
        const {input:{value}, showDate=true, showTime=true, closeOnSelect=false} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime  dateFormat={showDate && "MMM DD YYYY"} timeFormat={showTime} closeOnSelect={closeOnSelect} value={moment(value)} onChange={(e)=>this.onChange(e)} />
            </FormFieldWrapper>
        );
    }
}