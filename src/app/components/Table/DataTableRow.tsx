import DataTableGroupBy from './DataTableGroupBy';
import * as CellTypes from './TableColumnCell';
import React from 'react';
import DataTableExpansionCol from './DataTableExpansionCol';

interface DataTableRowProps {
    dataTableInstance?: any;
    fields: any;
    fieldModel: any;
    fieldInstanceName: string;
    index: any;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    expandedRows?: Set<number>;
    onExpandRowClicked?: (rowIdx: number) => void;
    shouldRenderRow?: (model: any) => boolean;
    disableRow?: boolean;
    markRowAsDeleted?: boolean;
    groupBy?: any;
    groupByParams?: any;
    newRowCount?: number;
}

class DataTableRow extends React.Component<DataTableRowProps> {
    renderActions = () => {
        const {
            dataTableInstance,
            fields,
            fieldModel,
            fieldInstanceName,
            index,
            actionsColumn,
            disableRow
        } = this.props;

        const { id = null, cancelDate = undefined } = fieldModel || {};

        let rowActionsColumn = actionsColumn || CellTypes.Actions();

        const Column = cancelDate !== undefined
            ? rowActionsColumn.CanceledRender
            : rowActionsColumn.FormRenderer;

        const rowActions = (actionsColumn && actionsColumn.actions)
            ? actionsColumn.actions : [];

        // TODO: Make this use a class?
        // Flex align end to make sure buttons are right-aligned
        return (
            <td
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Column
                    disabled={disableRow}
                    model={fieldModel}
                    fieldInstanceName={fieldInstanceName}
                    fields={fields}
                    index={index}
                    callbackContext={dataTableInstance}
                    actions={rowActions}
                />
            </td>
        );
    }

    renderColumns = (col: any, colIndex: number) => {
        const {
            dataTableInstance,
            fields,
            fieldModel,
            fieldInstanceName,
            index,
            disableRow
        } = this.props;

        const { id = null, cancelDate = undefined } = fieldModel || {};

        const Column = cancelDate !== undefined
            ? col.CanceledRender
            : col.FormRenderer;

        return (
            <td key={colIndex}>
                <Column
                    disabled={disableRow}
                    model={fieldModel}
                    fieldInstanceName={fieldInstanceName}
                    fields={fields}
                    index={index}
                    callbackContext={dataTableInstance}
                />
            </td>
        );
    }

    render() {
        const {
            fields,
            fieldModel,
            fieldInstanceName,
            index,
            columns = [],
            actionsColumn,
            displayActionsColumn = true,
            expandable = false,
            expandedRows,
            onExpandRowClicked,
            disableRow,
            markRowAsDeleted,
            groupBy,
            groupByParams,
            newRowCount = 0
            // isModalOpen
        } = this.props;

        const { id = null, cancelDate = undefined } = fieldModel || {};

        return (
            <tr className={markRowAsDeleted ? 'mark-as-deleted' : ''}>
                {groupBy && (
                    <DataTableGroupBy
                        newRowCount={newRowCount}
                        rowIndex={index}
                        params={groupByParams}
                    />
                )}
                {expandable && (
                    <DataTableExpansionCol
                        fieldIndex={index}
                        expandable={!!id}
                        expandedRows={expandedRows}
                        onExpandRowClicked={onExpandRowClicked}
                    />
                )}
                {columns.map(this.renderColumns)}
                {displayActionsColumn && this.renderActions()}
            </tr>
        );
    }
}

export default DataTableRow;
