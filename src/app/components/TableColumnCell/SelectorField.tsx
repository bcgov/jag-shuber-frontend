import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import SelectorField from '../../components/FormElements/SelectorField';
import Selector from '../../components/FormElements/Selector';

const SelectorFieldColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Select Field';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'selectorField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    // TODO: Merge / re-implement disabled - we're now disabling by row... we'll need another way to disable individual cells.
    // const disabled = (options && options.disabled) ? options.disabled : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const filterable = (options && options.filterable) ? options.filterable : false;
    const filterColumn = (options && options.filterColumn) ? options.filterColumn : undefined;
    const FilterSelectorComponent = (options && options.filterSelectorComponent) ? options.filterSelectorComponent : Selector;
    const SelectorComponent = (options && options.selectorComponent) ? options.selectorComponent : Selector;
    const onChange = (options && options.onChange) ? options.onChange : () => {};

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.onChange = filterColumn;
    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;
    filterComponentOptions.selectorComponent = FilterSelectorComponent;

    return {
        title: label,
        fieldName,
        colStyle,
        filterable,
        filterComponent: (filterable) ? SelectorFieldColumn(label, filterComponentOptions) : undefined,
        filterColumn,
        displayInfo,
        FormRenderer: ({ fieldInstanceName , disabled}) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={(p) => (
                    <SelectorField
                        {...p}
                        showLabel={false}
                        disabled={disabled}
                        SelectorComponent={
                            (sp) =>
                                <SelectorComponent {...sp} label={label} />
                        }
                    />
                )}
                label={label}
                onChange={(ev, newValue, previousValue) => {
                    if (ev) {
                        // TODO: No idea why this doesn't act the same as Field in say, the TextField column... ugh.
                        onChange(ev.nativeEvent as Event, newValue, previousValue, `${fieldInstanceName}.${fieldName}`);
                    }
                }}
                disabled={disabled}
            />
        ),
        CanceledRender: () => (<option disabled={true} />)
    };
};

export default SelectorFieldColumn;
