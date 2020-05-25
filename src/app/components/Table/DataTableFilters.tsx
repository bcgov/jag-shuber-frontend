import { Table } from 'react-bootstrap';
import DataTableFilterRow from './DataTableFilterRow';
import React from 'react';
import * as CellTypes from './TableColumnCell';

export interface DataTableFiltersProps {
    columns: CellTypes.Types.TableColumnCell[];
    displayActionsColumn?: boolean;
    expandable?: boolean;
    filterable?: boolean;
    groupBy?: any;
    filterFieldName?: string;
    showExpiredFilter?: boolean;
    onToggleExpiredClicked?: Function;
    onResetClicked?: Function;
}

class DataTableFilters<T> extends React.Component<DataTableFiltersProps> {
    render() {
        const {
            columns = [],
            displayActionsColumn = true,
            expandable = false,
            filterable,
            groupBy,
            filterFieldName,
            showExpiredFilter,
            onResetClicked,
            onToggleExpiredClicked
        } = this.props;

        return (
            <div className="data-table-filter-row">
                <Table striped={true}>
                    {/* We're doing the filter row as a separate table because nesting it in the FieldArray causes
                    binding issues or issues with initialValues or something...
                    basically, redux-form doesn't like it so we're not gonna force it. */}
                    <thead>
                        <DataTableFilterRow<Partial<any & T>>
                            onResetClicked={onResetClicked}
                            onToggleExpiredClicked={onToggleExpiredClicked}
                            fieldName={filterable ? filterFieldName : ''}
                            columns={columns}
                            expandable={expandable}
                            filterable={filterable}
                            showExpiredFilter={showExpiredFilter}
                            groupBy={!!groupBy}
                            displayActionsColumn={displayActionsColumn}
                        />
                    </thead>
                </Table>
            </div>
        );
    }
}

export default DataTableFilters;
