import React from 'react';
import { FieldArray, FieldsProps } from 'redux-form';

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
        initialValue: {},
        filterable: false,
        filterRows: () => true
    };

    // @ts-ignore
    render() {
        const componentInstance = this;

        const {
            fieldName,
            columns = [],
            displayActionsColumn = true,
            expandable = false
        } = this.props;

        return (
            <FieldArray<Partial<any & T>>
                name={fieldName}
                component={({ fields }) => {
                    return (
                        <tr style={{backgroundColor: '#eee'}}>
                            {expandable && (<th style={{width: '60px'}}/>)}
                            {columns.map((col, colIndex) => {
                                const Column = (col.filterComponent)
                                    ? col.filterComponent().FormRenderer
                                    : col.FormRenderer;

                                return (
                                    <th className="text-left" key={colIndex}
                                        style={col.colStyle}>
                                        {col.filterable && (
                                            <div
                                                style={{display: 'flex', alignItems: 'center'}}>
                                                <Column
                                                    model={{test: 'test'}}
                                                    fieldInstanceName={`fieldName_${Math.random().toString()}`}
                                                    fields={fields}
                                                    index={0}
                                                    callbackContext={componentInstance}
                                                />
                                                <div className="form-group"
                                                     style={{marginLeft: '0.5rem'}}>
                                                    <Glyphicon glyph="filter"/>
                                                    {/* TODO: Change this to 'ban' icon if filter is set */}
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
                    );
                }}
            />
        );
    }
}
