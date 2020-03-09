import React from 'react';
import { FormControl } from 'react-bootstrap';
import { IdType } from '../../api';

export interface SelectorWithOptGroupProps {
    data?: { optGroupLabel: string, options: { key: IdType | string | number, value: string | undefined }[] }[];
    label?: string;
    value?: string;
    onChange?: (val: string) => void;
}

export default class SelectorWithOptGroup extends React.PureComponent<SelectorWithOptGroupProps> {

    handleOnChange(ev: any) {
        const { onChange } = this.props;
        if (onChange) {
            onChange((ev.target as any).value);
        }
    }

    render() {
        const {
            data = [],
            label = '',
            value = ''
        } = this.props;
        return (
            <FormControl
                componentClass="select"
                value={value}
                onChange={(v) => this.handleOnChange(v)}
            >
                <option disabled={true} selected={value === ''} value="">{`Select ${label}`}</option>}
                {data.map(group => {
                    return (
                        <optgroup label={group.optGroupLabel} key={group.optGroupLabel}>
                            {group.options.map((keyValue, index) =>
                                <option
                                    key={index}
                                    selected={value === keyValue.key}
                                    value={keyValue.key}
                                >
                                    {keyValue.value}
                                </option>)}
                        </optgroup>
                    );
                })

                }
            </FormControl>
        );
    }
}
