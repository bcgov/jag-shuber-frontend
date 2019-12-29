import React from 'react';
import { Fields, FieldArray, FieldsProps } from 'redux-form';

import { Glyphicon } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<any>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export interface DataTableFilterRowProps {
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    buttonLabel?: React.ReactNode;
    initialValue?: any;
    filterable?: boolean;
    filterRows?: Function;
}

export default class DataTableFilterRow<T> extends React.Component<DataTableFilterRowProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        displayActionsColumn: true,
        expandable: false,
        // expandedRows: false,
        buttonLabel: 'Create',
        initialValue: {}, // TODO: Shouldn't this be initialValues? And do we actually need this...
        filterable: false,
        filterRows: () => true
    };

    shouldComponentUpdate(nextProps: Readonly<DataTableFilterRowProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }

    // @ts-ignore
    render() {
        const componentInstance = this;

        const {
            fieldName,
            columns = [],
            displayActionsColumn = true,
            expandable = false
        } = this.props;

        const filterFieldNames = columns.map((col, index) => {
            return (col.fieldName && col.filterable) ? `${fieldName}.${col.fieldName}` : undefined;
        }).filter(col => col) as string[];

        // console.log('dump filter field config');
        // console.log(filterFieldNames);

        return (
            <Fields<Partial<any & T>>
                names={filterFieldNames}
                component={({ fields }) => (
                    <tr style={{backgroundColor: '#eee'}}>
                        {expandable && (<th style={{width: '60px'}}/>)}
                        {columns.map((col, colIndex) => {
                            const Column = (col.filterComponent)
                                ? col.filterComponent.FormRenderer
                                : col.FormRenderer;

                            return (
                                <th className="text-left"
                                    key={col.fieldName}
                                    style={col.colStyle}>
                                    {col.filterable && (
                                        <div
                                            style={{display: 'flex', alignItems: 'center'}}>
                                            <Column
                                                model={{}}
                                                fieldInstanceName={fieldName}
                                                fields={fields}
                                                index={colIndex}
                                                callbackContext={componentInstance}
                                            />
                                            <div className="form-group"
                                                 style={{marginLeft: '0.5rem'}}>
                                                <Glyphicon glyph="filter"/>
                                            </div>
                                        </div>
                                    )}
                                </th>
                            );
                        })}

                        {displayActionsColumn && (
                            <th
                                style={{
                                    width: '250px'
                                }}
                            />
                        )}
                    </tr>
                )}
            />
        );
    }
}
