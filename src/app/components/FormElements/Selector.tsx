import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';

export interface SelectorProps {
    data: { key: string | number, value: string }[];
    allowNone?: boolean;
    noneLabel?: string;
    showVariedOption?: boolean;
}

export default class Selector extends React.PureComponent<FormFieldWrapperProps & SelectorProps> {
    render() {
        const { 
            input: { value, onChange }, 
            label, 
            data, 
            allowNone = false, 
            noneLabel = 'None',
            showVariedOption = false 
        } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    {!allowNone &&
                         <option disabled={true} selected={value === ''} value="">{`Select ${label}`}</option>}
                    {allowNone && <option selected={value === ''} value="">{noneLabel}</option>}
                    {showVariedOption && 
                        <option disabled={true} selected={value === 'varied'} value="varied">Varied</option>}
                    {data.map((keyValue, index) => 
                        <option 
                            key={index}
                            selected={value === keyValue.key} 
                            value={keyValue.key}
                        >
                            {keyValue.value}
                        </option>)}
                </FormControl>
            </FormFieldWrapper>
        );
    }
}