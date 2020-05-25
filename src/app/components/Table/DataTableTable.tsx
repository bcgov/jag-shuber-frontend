import { Table, Well } from 'react-bootstrap';

import React from 'react';

import { FieldsProps, WrappedFieldArrayProps } from 'redux-form';

import * as CellTypes from './TableColumnCell';
import { DataTableDetailComponentProps } from './DataTableDetail';
import { DataTableModalComponentProps } from './DataTableModal';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableRow from './DataTableRow';
import DataTableDetail from './DataTableDetail';
import DataTableModal from './DataTableModal';
import DataTableDeletedRowOverlay from './DataTableDeletedRowOverlay';

export interface DataTableTableProps<T> {
    fields: FieldsProps<Partial<T>>;
    title: React.ReactNode;
    buttonLabel?: React.ReactNode; // TODO... a hash of values maybe :)
    fieldName: string;
    filterFieldName?: string;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    // TODO: It would be preferable to supply header actions the same way we use actionsColumn...
    onResetClicked?: Function;
    onToggleExpiredClicked?: Function;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    expandedRows?: Set<number>;
    onExpandRowClicked?: (rowIdx: number) => void;
    modalProps?: any;
    modalComponent: React.ReactType<DataTableModalComponentProps>;
    rowComponent: React.SFC<DataTableDetailComponentProps>;
    shouldRenderRow?: (model: any) => boolean;
    shouldDisableRow?: (model: any) => boolean;
    shouldMarkRowAsDeleted?: (model: any) => boolean;
    initialValue?: any;
    filterable?: boolean;
    showExpiredFilter?: boolean;
    filterRows?: Function;
    groupBy?: any;
    sortBy?: string[]; // TODO: Not implemented yet
    shouldSortBy?: (col: any, colIndex: number) => boolean; // TODO: Not implemented yet
}

class DataTableTable<T> extends React.Component<DataTableTableProps<T> & WrappedFieldArrayProps<T>> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        // TODO: It would be preferable to supply header actions the same way we use actionsColumn...
        onResetClicked: () => {},
        onToggleExpiredClicked: () => {},
        displayActionsColumn: true,
        actionsColumn: null,
        expandable: false,
        expandedRows: new Set<number>(),
        // TODO: What is up with default props?
        rowComponent: <div />,
        shouldRenderRow: (model: any) => true,
        shouldDisableRow: (model: any) => false,
        shouldMarkRowAsDeleted: (model: any) => false,
        modalProps: {},
        modalComponent: <div />,
        buttonLabel: 'Create',
        initialValue: {},
        filterable: false,
        showExpiredFilter: false,
        filterRows: () => true
    };

    state = {
        expandedRows: new Set(),
        activeRowId: undefined,
        isModalOpen: false
    };

    private _aggregates: {} = {};

    get aggregates() {
        return this._aggregates;
    }

    set aggregates(aggregates: any) {
        this._aggregates = aggregates;
    }

    private _newRowCount: {} = {};

    get newRowCount() {
        return this._newRowCount;
    }

    set newRowCount(newRowCount: any) {
        this._newRowCount = newRowCount;
    }

    calculateAggregates(fields: any): void {
        const { groupBy } = this.props;
        const { groupByKey, valueMapLabels } = groupBy || { groupByKey: null, valueMapLabels: {} };

        // This can be undefined, especially when things are just loading up...
        // Make sure we use an empty array a a fallback!
        const rows = fields.getAll() || [];

        const aggregates = rows.reduce((acc: any , cur: any, idx: number) => {
            const value = cur[groupByKey];
            if (value === undefined || value === null) return acc;
            if (!acc.hasOwnProperty(value)) {
                acc[value] = { count: 1 };
            } else if (acc.hasOwnProperty(value)) {
                acc[value].count++;
            }
            return acc;
        }, {});

        this.aggregates = aggregates;

        /* if (Object.keys(aggregates).length > 0) {
            console.log(`Group [${fieldName}] by [${groupByKey}]: ${JSON.stringify(aggregates)}`);
        } */
    }

    onExpandRowClicked = (rowIdx: number) => {
        const { expandedRows } = this.state;

        if (!expandedRows.has(rowIdx)) {
            expandedRows.add(rowIdx);
        } else {
            expandedRows.delete(rowIdx);
        }

        this.setState({
            expandedRows: expandedRows
        });
    }

    setActiveRow = (id: any) => {
        this.setState({
            activeRowId: id
        });
    }

    getModalState = (fieldModel: any) => {
        const { activeRowId } = this.state;
        return !!(activeRowId && (activeRowId === fieldModel.id));
    }

    render() {
        const {
            fields,
            buttonLabel,
            columns = [],
            displayHeaderActions = false,
            displayHeaderSave = true,
            displayActionsColumn = true,
            actionsColumn,
            expandable = false,
            // expandedRows,
            // onExpandRowClicked,
            shouldRenderRow,
            shouldDisableRow,
            shouldMarkRowAsDeleted,
            filterable,
            groupBy,
            shouldSortBy,
            sortBy,
            rowComponent,
            modalProps,
            modalComponent
        } = this.props;

        const {
            activeRowId,
            expandedRows
        } = this.state;

        let aggregates = {};
        // Re-calculate aggregates
        if (fields) {
            this.calculateAggregates(fields);
            aggregates = this.aggregates;
        }

        const extendedModalProps = {
            isOpen: this.getModalState,
            onClose: () => this.setActiveRow(null),
            ...modalProps
        };

        // Re-start new row count
        this.newRowCount = 0;

        return (
            <div className="data-table-header-row">
                <Table striped={true} >
                    <thead>
                        <DataTableHeaderRow
                            fields={fields}
                            columns={columns}
                            expandable={expandable}
                            filterable={filterable}
                            groupBy={!!groupBy}
                            sortBy={sortBy}
                            shouldSortBy={shouldSortBy}
                            displayHeaderActions={displayHeaderActions}
                            displayHeaderSave={displayHeaderSave}
                            displayActionsColumn={displayActionsColumn}
                            // TODO: Rename this, what kind of button is it :)
                            buttonLabel={buttonLabel}
                        />
                    </thead>

                    <tbody>
                    {fields.length === 0 && (
                        <tr>
                            <td colSpan={(expandable ? columns.length + 2 : columns.length + 1) + (!!groupBy ? 1 : 0)}>
                                <Well style={{textAlign: 'center'}}>No records found.</Well>
                            </td>
                        </tr>
                    )}
                    {fields.length > 0 && fields.map((fieldInstanceName: any, index: number) => {
                        const fieldModel: Partial<any> = fields.get(index);
                        const { id = null, cancelDate = undefined } = fieldModel || {};

                        if (shouldRenderRow && !shouldRenderRow(fieldModel)) return null;
                        const disableRow = (shouldDisableRow && shouldDisableRow(fieldModel));
                        const markRowAsDeleted = (shouldMarkRowAsDeleted && shouldMarkRowAsDeleted(fieldModel));

                        // We can do this because new rows are always at the top of the list
                        if (!id) this.newRowCount++;

                        const { groupByKey, valueMapLabels } = groupBy || { groupByKey: null, valueMapLabels: {} };
                        const groupByParams = (groupBy) ? {
                            groupByField: groupByKey,
                            valueMapLabels: valueMapLabels,
                            values: { ...aggregates }
                        } : {};

                        return (
                            <>
                                {markRowAsDeleted && (
                                    <DataTableDeletedRowOverlay
                                        markRowAsDeleted={markRowAsDeleted}
                                        columns={columns}
                                        expandable={expandable}
                                        groupBy={groupBy}
                                    />
                                )}
                                <DataTableRow
                                    dataTableInstance={this}
                                    fields={fields}
                                    fieldInstanceName={fieldInstanceName}
                                    fieldModel={fieldModel}
                                    index={index}
                                    columns={columns}
                                    displayActionsColumn={displayActionsColumn}
                                    actionsColumn={actionsColumn}
                                    expandable={expandable}
                                    expandedRows={expandedRows}
                                    onExpandRowClicked={this.onExpandRowClicked}
                                    groupBy={groupBy}
                                    groupByParams={groupByParams}
                                    disableRow={disableRow}
                                    markRowAsDeleted={markRowAsDeleted}
                                    newRowCount={this.newRowCount}
                                />
                                {expandable && expandedRows && expandedRows.has(index) && (
                                    <DataTableDetail
                                        fieldModel={fieldModel}
                                        index={index}
                                        columns={columns}
                                        expandable={expandable}
                                        rowComponent={rowComponent}
                                    />
                                )}

                                <DataTableModal
                                    key={activeRowId}
                                    fieldModel={fieldModel}
                                    index={index}
                                    modalProps={extendedModalProps}
                                    modalComponent={modalComponent}

                                />
                            </>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default DataTableTable;
