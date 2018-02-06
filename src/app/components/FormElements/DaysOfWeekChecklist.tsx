import * as React from 'react';
import * as EnumUtils from '../../infrastructure/EnumUtils';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { DaysOfWeek } from '../../api';



export default class DaysOfWeekChecklist extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { onChange } } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <div style={{marginTop:1}}>
                     {EnumUtils.getEnumKeyLabels(DaysOfWeek).filter(k => k != 'Weekdays' && k != 'Everyday').map((k) =>
                        <Checkbox inline onChange={onChange} value={k} style={{paddingRight:15}}>{k}</Checkbox>)}
                </div>
            </FormFieldWrapper>

        );
    }
}