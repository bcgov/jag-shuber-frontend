import React from 'react';

const ExpandableTableRow = (props: any) => {
    const {
        index,
        items = [],
        expandable = false,
        columns = [],
        expandedRows = [],
        DetailComponent,
        ExpandableTableRowExpandColumn,
        ExpandableTableRowColumns,
        ExpandableTableRowActionsColumn
    } = props;

    const fieldModel: Partial<any> = items.get(index);
    const { id = null, cancelDate = undefined } = fieldModel || {};

    return (
        <>
            <tr key={index}>
                <ExpandableTableRowExpandColumn {...props} fieldModel={fieldModel} id={id} />
                <ExpandableTableRowColumns {...props} />
                <ExpandableTableRowActionsColumn {...props} />
            </tr>
            {expandable && expandedRows && expandedRows.has(index) && (
                <tr key={index * 2}>
                    <td>{/* Nest the Table for sub-rows */}</td>
                    <td style={{margin: '0', padding: '0'}}
                        colSpan={expandable ? columns.length + 1 : columns.length}>
                        <DetailComponent
                            parentModel={fieldModel}
                            parentModelId={fieldModel.id}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default ExpandableTableRow;
