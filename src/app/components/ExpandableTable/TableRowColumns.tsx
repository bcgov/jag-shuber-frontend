import React from 'react';

const ExpandableTableRowColumns = (props: any) => {
    const { columns = [], cancelDate } = props;
    return (
        <>
        {
            columns
                .map((col: any, colIndex: any) => {
                    const Column = cancelDate != undefined
                        ? col.CanceledRender
                        : col.FormRenderer;

                    return (
                        <td key={colIndex}>
                            {/* <Column /> */}
                        </td>
                    );
                })
        }
        </>
    );
};

export default ExpandableTableRowColumns;
