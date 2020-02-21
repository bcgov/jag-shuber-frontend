import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export interface DataTableGroupByProps {
    rowIndex: number;
    newRowCount: number;
    params?: any; // TODO: Make params a shape
}

const DataTableGroupBy = ({ newRowCount = 0, rowIndex, params = {}}: DataTableGroupByProps) => {
    const { groupByKey, valueMapLabels = {}, valueMapLabelStyles = {}, values = {} } = params;

    if (rowIndex < newRowCount) {
        return <td />;
    }

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
                groupLabels[idx].rowIndex = agrIdx + newRowCount;
                acc.push(agrIdx + cur);
                return acc;
            }, [0])
        : null;

    // tslint:disable-next-line:max-line-length
    /* if (groupLabels.length === 2 && groupLabels[0].style && groupLabels[1].style && groupLabelStr === 'Custom Roles') {
        // debugger;
    } */

    const groupMinMaxIndexes = [...groupBreakIndexes].reduce((acc: number, cur: number, idx: number, arr: number[]) => {
        let prevVal = acc + newRowCount;
        let curVal = cur + newRowCount;
        if (rowIndex >= prevVal && rowIndex < curVal) {
            arr.splice(1); // Break out of reduce
            return { min: prevVal, max: curVal };
        }

        return cur;
    });

    console.log('groupLabels');
    console.log(groupLabels);
    console.log(`groupIndex min: ${groupMinMaxIndexes.min}, max: ${groupMinMaxIndexes.max}`);

    let groupLabel = (groupLabels.length > 0)
        ? groupLabels.find((l) => l.rowIndex === groupMinMaxIndexes.min)
        : null;

    const groupLabelStyle = (groupLabel) ? groupLabel.style : {};
    const groupLabelStr = (groupLabel) ? groupLabel.label : '';

    // What row should we inject the label on?
    const labelRowIndexOffset = Math.floor((groupMinMaxIndexes.max - groupMinMaxIndexes.min) / 2);
    console.log(`rowIndex: ${rowIndex}`);
    console.log(labelRowIndexOffset);
    const offsetGroupBreakIndexes = [...groupBreakIndexes].map((breakIndex: number) => breakIndex + labelRowIndexOffset + newRowCount);
    console.log(groupBreakIndexes);
    console.log(offsetGroupBreakIndexes);
    console.log(groupBreakIndexes && offsetGroupBreakIndexes.indexOf(rowIndex));
    console.log('---------');

    const labelDisplay = ((groupMinMaxIndexes.max - groupMinMaxIndexes.min) > 2) ? 'string' : 'icon';

    return (
        <>
            {groupBreakIndexes && offsetGroupBreakIndexes.indexOf(rowIndex) > -1 && (
                <td
                    style={groupLabelStyle}
                >
                    {labelDisplay === 'string' && (
                    <div className="group-label-vert">
                        {groupLabelStr}
                    </div>
                    )}
                    {labelDisplay === 'icon' && (
                    <div className="group-label">
                        <div style={{ textAlign: 'center' }}><b>{groupLabelStr.slice(0, 1)}</b></div>
                    </div>
                    )}
                </td>
            )}
            {groupBreakIndexes && offsetGroupBreakIndexes.indexOf(rowIndex) === -1 && (
                <td style={groupLabelStyle} />
            )}
        </>
    );
};

export default DataTableGroupBy;
