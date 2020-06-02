import React from 'react';
import { Fields, FieldArray, FieldsProps } from 'redux-form';

import { Button, FormGroup, Glyphicon } from 'react-bootstrap';

import * as CellTypes from './TableColumnCell';
import ToggleField from '../FormElements/ToggleField';
import Toggle from '../Toggle/Toggle';

export interface DataTableFilterRowProps {
    dataTableInstance?: any;
    fieldName?: string;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    onResetClicked?: Function;
    onToggleExpiredClicked?: Function;
    showExpiredFilter?: boolean;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    buttonLabel?: React.ReactNode;
    initialValue?: any;
    filterable?: boolean;
    filterRows?: Function;
    groupBy?: boolean;
}

export default class DataTableFilterRow<T> extends React.Component<DataTableFilterRowProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        onResetClicked: () => {},
        onToggleExpiredClicked: () => {},
        showExpiredFilter: false,
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
        const {
            dataTableInstance,
            fieldName,
            columns = [],
            displayActionsColumn = true,
            expandable = false,
            onResetClicked,
            onToggleExpiredClicked,
            showExpiredFilter = true, // TODO: Switch this to false
            groupBy = false
        } = this.props;

        const filterFieldNames = columns.map((col, index) => {
            return (col.fieldName && col.filterable) ? `${fieldName}.${col.fieldName}` : undefined;
        }).filter(col => col) as string[];

        let showExpired = false;
        const onResetClickedHandler = function() {
            if (onResetClicked) {
                onResetClicked(arguments);
                showExpired = false;
            }
        }

        return (
            <Fields<Partial<any & T>>
                names={filterFieldNames}
                component={({ fields }) => (
                    <tr>
                        {groupBy && (
                            <th style={{ width: '3rem', backgroundColor: '#eee', borderTop: 'none' }}></th>
                        )}
                        {expandable && (<th style={{width: '60px'}}/>)}
                        {columns.map((col, colIndex) => {
                            const Column = (col.filterComponent)
                                ? col.filterComponent.FormRenderer
                                : col.FormRenderer;

                            return (
                                <th
                                    className="text-left"
                                    key={col.fieldName}
                                    style={col.colStyle}
                                >
                                    {col.filterable && fieldName && (
                                        <div
                                            style={{display: 'flex', alignItems: 'center'}}>
                                            <Column
                                                model={{}}
                                                fieldInstanceName={fieldName}
                                                fields={fields}
                                                index={colIndex}
                                                callbackContext={dataTableInstance}
                                            />
                                            {/*
                                            <div className="form-group"
                                                 style={{marginLeft: '0.5rem'}}>
                                                <Glyphicon glyph="filter"/>
                                                <Glyphicon style={{ color: '#d9534f' }}glyph="remove-sign"/>
                                            </div>
                                            */}
                                        </div>
                                    )}
                                </th>
                            );
                        })}

                        {displayActionsColumn && (
                            <th
                                style={{
                                    width: 'auto'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <FormGroup style={{ flex: '0', marginLeft: '5px', marginRight: '5px' }}>
                                        <Button bsStyle="default" onClick={onResetClickedHandler as any}>
                                            <Glyphicon glyph="remove-sign" /> Clear
                                        </Button>
                                    </FormGroup>
                                    {showExpiredFilter && (
                                    <FormGroup style={{ position: 'relative', top: '-4px', flex: '0', marginLeft: '5px', marginRight: '5px', display: 'flex', flexDirection: 'column' }}>
                                        {/* <Button bsStyle="default" onClick={onToggleExpiredClicked as any}>
                                            <Glyphicon glyph="time" /> Toggle Expired
                                        </Button> */}
                                        <label style={{ fontSize: '0.8rem', marginBottom: '0' }}>View Expired</label>

                                        <Toggle
                                            key={showExpired.toString()}
                                            defaultChecked={showExpired}
                                            onChange={() => onToggleExpiredClicked && onToggleExpiredClicked()}
                                            checkedLabel={'Yes'}
                                            uncheckedLabel={'No'}
                                        />
                                    </FormGroup>
                                    )}
                                </div>
                            </th>
                        )}
                    </tr>
                )}
            />
        );
    }
}
