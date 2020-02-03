import { Well } from 'react-bootstrap';
import React from 'react';

const ExpandableTableExpandColumn = (props: any) => {
    const { items = [], expandable = false, columns = [] } = props;
    return items.length === 0
        ? (
            <tr>
                <td colSpan={expandable ? columns.length + 2 : columns.length + 1}>
                    <Well
                        style={{textAlign: 'center'}}>No records found.
                    </Well>
                </td>
            </tr>
        ) : null;
};

export default ExpandableTableExpandColumn;
