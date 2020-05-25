import React from 'react';

interface DeletedRowOverlayProps {
    markRowAsDeleted: boolean;
    columns: any[];
    expandable: boolean;
    groupBy: any;
}

const DeletedRowOverlay = (props: DeletedRowOverlayProps) => {
    const {
        markRowAsDeleted,
        columns = [],
        expandable = false,
        groupBy,
    } = props;

    return (
        <tr className={markRowAsDeleted ? 'mark-as-deleted-strike' : ''}>
            {expandable && (
            <td />
            )}
            {groupBy && (
            <td />
            )}
            <td colSpan={expandable ? columns.length + 1 : columns.length}>
                <hr className="strike-through" />
            </td>
        </tr>
    );
}

export default DeletedRowOverlay;
