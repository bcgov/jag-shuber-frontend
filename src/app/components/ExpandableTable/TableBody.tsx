import React from 'react';

const ExpandableTableBody = (props: any) => {
    const {
        items = [],
        ExpandableTableExpandColumn,
        ExpandableTableRow
    } = props;

    return (
        <tbody>
            <ExpandableTableExpandColumn />
            {items.length > 0 && items.map((item: any, index: Number) => {
                const fieldModel: Partial<any> = items.get(index);
                const { id = null, cancelDate = undefined } = fieldModel || {};

                return (
                    <ExpandableTableRow {...props} />
                );
            })}
            </tbody>
    );
};

export default ExpandableTableBody;
