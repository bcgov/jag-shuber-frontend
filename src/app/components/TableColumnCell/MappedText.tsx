import * as React from 'react';
import { Field } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import Selector from '../../components/FormElements/Selector';

import SelectorFieldColumn from './SelectorField';

const MappedTextColumn = (label?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Select Field';

    const fieldName = (options && options.fieldName) ? options.fieldName : 'selectorField';
    const displayInfo = (options && options.displayInfo) ? options.displayInfo : false;
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const placeholder = (options && options.placeholder) ? options.placeholder : undefined;
    const filterable = (options && options.filterable) ? options.filterable : false;
    const filterColumn = (options && options.filterColumn) ? options.filterColumn : undefined;
    const FilterSelectorComponent = (options && options.filterSelectorComponent) ? options.filterSelectorComponent : Selector;
    const DisplayComponent = (options && options.selectorComponent) ? options.selectorComponent : Selector;

    const filterComponentOptions = (options)
        ? Object.create(options) as Types.FieldColumnOptions
        : {} as Types.FieldColumnOptions;

    filterComponentOptions.onChange = filterColumn;
    filterComponentOptions.filterable = false;
    filterComponentOptions.displayInfo = false;
    filterComponentOptions.selectorComponent = FilterSelectorComponent;
    // filterComponentOptions.placeholder = `Filter ${label}`;

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
                    <DisplayComponent {...p} label={label} />
                )}
                label={label}
            />
        ),
        CanceledRender: () => (<option disabled={true} />)
    };
};

export default MappedTextColumn;
