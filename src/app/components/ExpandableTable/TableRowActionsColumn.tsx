import React from 'react';

const ExpandableTableRowActionsColumn = (props: any) => {
    const { displayActionsColumn } = props;

    const renderActions = () => {
        // Flex align end to make sure buttons are right-aligned
        return (
            <td style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                {/* <Column /> */}
            </td>
        );
    };

    return displayActionsColumn ? renderActions() : null;
};

export default ExpandableTableRowActionsColumn;
