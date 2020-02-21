import React from 'react';

export interface DataTableGroupByProps {
    rowIndex: number;
    params?: any; // TODO: Make params a shape
}

const DataTableGroupBy = ({ rowIndex, params = {}}: DataTableGroupByProps) => {
    const { groupByKey, valueMapLabels = {}, valueMapLabelStyles = {}, values = {} } = params;

    let groupLabels: any[] = [];

    const groupBreakIndexes = values
        ? Object.keys(values)
            .map((key) => {
                if (values[key]) {
                    groupLabels.push({ rowIndex: null, label: valueMapLabels[key], style: valueMapLabelStyles[key] });
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

    const groupLabelStr = (groupLabel) ? groupLabel.label : '';

    // tslint:disable-next-line:max-line-length
    /* if (groupLabels.length === 2 && groupLabels[0].style && groupLabels[1].style && groupLabelStr === 'Custom Roles') {
        // debugger;
    } */

    const groupMinMaxIndexes = [...groupBreakIndexes].reduce((acc: number, cur: number, idx: number, arr: number[]) => {
        if (rowIndex >= acc && rowIndex < cur) {
            arr.splice(1); // Break out of reduce
            return { min: acc, max: cur };
        }

        return cur;
    });

    // console.log('groupLabels');
    // console.log(groupLabels);
    // console.log(`groupIndex min: ${groupMinMaxIndexes.min}, max: ${groupMinMaxIndexes.max}`);

    let groupLabelStyle = (groupLabels.length > 0)
        ? groupLabels.find((l) => l.rowIndex === groupMinMaxIndexes.min)
        : null;

    groupLabelStyle = (groupLabelStyle) ? groupLabelStyle.style : {};

    return (
        <>
            {groupBreakIndexes && groupBreakIndexes.indexOf(rowIndex) > -1 && (
                <td
                    style={groupLabelStyle}
                >
                    <div className="group-label-vert">
                        {groupLabelStr}
                    </div>
                </td>
            )}
            {groupBreakIndexes && groupBreakIndexes.indexOf(rowIndex) === -1 && (
                <td style={groupLabelStyle} />
            )}
        </>
    );
};

export default DataTableGroupBy;
