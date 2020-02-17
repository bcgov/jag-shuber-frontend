import * as React from 'react';

import * as Types from './index';

import { ColumnRendererProps } from '../../TableColumn';

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export default interface TableColumnCell {
    title: React.ReactNode;
    fieldName?: string;
    colStyle?: any;
    filterable?: boolean;
    displayInfo?: boolean;
    filterComponent?: Types.TableColumnCell;
    filterColumn?: (event: Event, newValue: any, previousValue: any, name: string) => void;
    onChange?: (event: Event, newValue: any, previousValue: any, name: string) => void;
    FieldRenderer?: Function;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;

}

export interface FieldColumnOptions {
    fieldName?: string;
    displayInfo?: boolean;
    disabled?: boolean;
    placeholder?: string;
    filterable?: boolean;
    filterComponent?: TableColumnCell;
    filterColumn?: (event: Event, newValue: any, previousValue: any, name: string) => void;
    onChange?: (event: Event, newValue: any, previousValue: any, name: string) => void;
    filterSelectorComponent?: React.ReactType<any>;
    selectorComponent?: React.ReactType<any>;
    colStyle?: any;

}
