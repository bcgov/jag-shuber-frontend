import React from 'react';
import { FormControl } from 'react-bootstrap';

export interface SelectorProps {
    data?: { key: string | number, value: string }[];
    allowNone?: boolean;
    noneLabel?: string;
    showVariedOption?: boolean;
    variedLabel?: string;
    isDisabled?: boolean;
    label?:  string;
    value?: string;
    onChange?: (val: string) => void;
}

export default class Selector extends React.PureComponent<SelectorProps> {
    static VARIED_VALUE = 'varied';

    static isVaried(value: any) {
        return value === Selector.VARIED_VALUE;
    }

    handleOnChange(ev: any) {
        const { onChange } = this.props;
        if (onChange) {
            onChange((ev.target as any).value)
        }
    }

    render() {
        const {
            data = [],
            allowNone = false,
            noneLabel = 'None',
            showVariedOption = false,
            variedLabel = 'Varied',
            isDisabled = false,
            label = '',
            value = ''
        } = this.props;
        return (
            <FormControl
                componentClass="select"
                value={value}
                onChange={(v) => this.handleOnChange(v)}
                disabled={isDisabled}                
            >
                {!allowNone &&
                    <option disabled={true} selected={value === ''} value="">{`Select ${label}`}</option>}
                {allowNone && <option selected={value === ''} value="">{noneLabel}</option>}
                {showVariedOption &&
                    <option
                        disabled={true}
                        selected={Selector.isVaried(value)}
                        value={Selector.VARIED_VALUE}
                    >
                        {variedLabel}
                    </option>}
                {data.map((keyValue, index) =>
                    <option
                        key={index}
                        selected={value === keyValue.key}
                        value={keyValue.key}
                    >
                        {keyValue.value}
                    </option>)}
            </FormControl>
        );
    }
}