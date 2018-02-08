import * as React from 'react';
import * as EnumUtils from '../../infrastructure/EnumUtils';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { DaysOfWeek } from '../../api';


export default class DaysOfWeekChecklist extends React.PureComponent<FormFieldWrapperProps>{
    onChange(ev:any){
        const currentValue = Number(this.props.input.value);
        const checkedValue = Number(ev.target.value);
        let newValue = currentValue;
        if(ev.target.checked){
            newValue += checkedValue;
        }
        else{
            newValue -= checkedValue;
        }
        this.props.input.onChange(newValue);
    }
    render() {
        return (
            <FormFieldWrapper {...this.props}>
                <div style={{marginTop:1}}>
                     {EnumUtils.getEnumKeyLabels(DaysOfWeek).filter(k => k !== 'Weekdays' && k !== 'Everyday').map((k) =>
                        <Checkbox inline onChange={(e)=>this.onChange(e)} value={DaysOfWeek[k]} style={{paddingRight:15}}>{k}</Checkbox>)}
                </div>
            </FormFieldWrapper>

        );
    }
}