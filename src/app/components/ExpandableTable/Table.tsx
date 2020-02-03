import { Table } from 'react-bootstrap';
import React from 'react';

const ExpandableTable = (props: any) => {
    const {
        title = '',
        ExpandableTableHeader,
        ExpandableTableBody
    } = props;

    return (
        <div className="data-table">
            {title}
            <div className="data-table-header-row">
                <Table striped={true} >
                    <ExpandableTableHeader {...props} />
                    <ExpandableTableBody {...props} />
                </Table>
            </div>
        </div>
    );
};

export default ExpandableTable;
