import React from 'react';

export interface DataTableGroupByProps {
    rowIndex: number;
    params?: any; // TODO: Make params a shape
}

const DataTableGroupBy = ({ rowIndex, params = {}}: DataTableGroupByProps) => {
    const { groupByField, valueMapLabels = {}, values = {} } = params;

    let groupLabels: any[] = [];

    const groupBreakIndexes = values
        ? Object.keys(values)
            .map((key) => {
                if (values[key]) {
                    groupLabels.push({ rowIndex: null, label: valueMapLabels[key] });
                    return values[key].count;
                }
            })
            .reduce((acc, cur, idx) => {
                const agrIdx = acc[acc.length - 1];
                groupLabels[idx].rowIndex = agrIdx;
                acc.push(agrIdx + cur);
                return acc;
            }, [0])
        : null;

    // console.log('break at indexes:' + JSON.stringify(groupBreakIndexes));

    const groupLabel = (groupLabels.length > 0)
        ? groupLabels.find((l) => l.rowIndex === rowIndex)
        : null;

    console.log('groupLabels');
    console.log(groupLabels);

    const groupLabelStr = (groupLabel) ? groupLabel.label : '';

    return (
        <>
            {groupBreakIndexes && groupBreakIndexes.indexOf(rowIndex) > -1 && (
                <td
                    style={{
                        width: '3rem',
                        backgroundColor: '#eee',
                        borderTop: '1px solid #ddd',
                        borderRight: '1px solid #ddd'
                    }}
                >
                    <div className="group-label-vert">
                        {groupLabelStr}
                    </div>
                </td>
            )}
            {groupBreakIndexes && groupBreakIndexes.indexOf(rowIndex) === -1 && (
                <td style={{ width: '3rem', backgroundColor: '#eee', borderTop: 'none', borderRight: '1px solid #ddd' }} />
            )}
        </>
    );
};

export default DataTableGroupBy;
