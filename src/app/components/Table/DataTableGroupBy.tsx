import React from 'react';

export interface DataTableGroupByProps {
    rowIndex: number;
    params?: any; // TODO: Make params a shape
}

const DataTableGroupBy = ({ rowIndex, params = {}}: DataTableGroupByProps) => {
    const groupBy = true;
    const groupByRowCount = 5;

    const { groupNames = [] } = params;

    return (
        <>
            {groupBy && ((rowIndex + 1) % groupByRowCount === 1) && (
                <td
                    style={{
                        width: '3rem',
                        backgroundColor: '#eee',
                        borderTop: '1px solid #ddd',
                        borderRight: '1px solid #ddd'
                    }}
                >
                    <div className="group-label-vert">
                        {groupNames.shift()}
                    </div>
                </td>
            )}
            {groupBy && ((rowIndex + 1) % groupByRowCount !== 1) && (
                <td style={{ width: '3rem', backgroundColor: '#eee', borderTop: 'none', borderRight: '1px solid #ddd' }} />
            )}
        </>
    );
};

export default DataTableGroupBy;
