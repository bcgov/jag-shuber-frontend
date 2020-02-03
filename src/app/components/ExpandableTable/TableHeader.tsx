import React from 'react';

const ExpandableTableHeader = (props: any) => {
    const {
        ExpandableTableHeaderExpandColumn,
        ExpandableTableHeaderColumns,
        ExpandableTableHeaderActionsColumn
    } = props;

    return (
        <thead>
            {/* <DataTableHeaderRow
                fields={fields}
                columns={columns}
                expandable={expandable}
                filterable={filterable}
                displayHeaderActions={displayHeaderActions}
                displayHeaderSave={displayHeaderSave}
                displayActionsColumn={displayActionsColumn}
                // TODO: Rename this, what kind of button is it :)
                buttonLabel={buttonLabel}
            /> */}
            <tr>
                <ExpandableTableHeaderExpandColumn {...props} />
                <ExpandableTableHeaderColumns {...props} />
                <ExpandableTableHeaderActionsColumn {...props} />
            </tr>
        </thead>
    );
};

export default ExpandableTableHeader;
