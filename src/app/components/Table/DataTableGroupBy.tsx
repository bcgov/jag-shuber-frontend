import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const DEBUG_FIELDNAME = 'assignments.courtRoles';

export interface DataTableGroupByProps {
    fieldName?: string; // Just for debugging
    rowIndex: number;
    newRowCount: number;
    params?: any; // TODO: Make params a shape
}

const getLabelRowMinMax = (rowIndex: number, indexes: number[], fieldName?: string) => {
    // if (fieldName && fieldName === DEBUG_FIELDNAME && rowIndex === 2) debugger;

    let breakIndexes: number[] = [...indexes];

    let minBreakIndex = null;
    let maxBreakIndex = null;

    while (breakIndexes.length > 0) {
        let breakIndex = breakIndexes.shift()!;
        if (!isNaN(breakIndex) && rowIndex >= breakIndex) {
            minBreakIndex = breakIndex;
        }

        // If we find our max, break out of the loop, we're done
        if (!isNaN(breakIndex) && rowIndex < breakIndex) {
            maxBreakIndex = breakIndex;
            break;
        }
    }

    if (minBreakIndex === null || maxBreakIndex === null) {
        throw new Error('DataTable grouping error: a group must have max and min indexes!');
    }

    return { min: minBreakIndex, max: maxBreakIndex };
};

const DataTableGroupBy = ({ fieldName = '', newRowCount = 0, rowIndex, params = {}}: DataTableGroupByProps) => {
    const { groupByKey, valueMapLabels = {}, values = {} } = params;

    if (rowIndex < newRowCount) {
        return <td />;
    }

    let groupLabels: any[] = [];

    let objectKeys = Object.keys(values);
    let sortedObjectKeys = [...objectKeys];
    sortedObjectKeys.sort().reverse(); // TODO: Make the sorting configurable

    let totalValues = 0;
    let groupBreakIndexes = values
        ? sortedObjectKeys
            .map((key) => {
                if (values[key]) {
                    groupLabels.push({ rowIndex: null, label: valueMapLabels[key].label, style: valueMapLabels[key].style || {} });
                    totalValues += values[key].count;
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

    let offsetGroupBreakIndexes: any[] = [];
    offsetGroupBreakIndexes = [...groupBreakIndexes].map((breakIndex: number) => breakIndex + newRowCount);
    groupBreakIndexes = offsetGroupBreakIndexes;

    const labelRowMinMax = getLabelRowMinMax(rowIndex, groupBreakIndexes, fieldName);
    // What row should we inject the label on?
    const labelRowIndexOffset = Math.floor((labelRowMinMax.max - labelRowMinMax.min) / 2);

    let groupLabel = (groupLabels.length > 0)
        ? groupLabels.find((l) => l.rowIndex === labelRowMinMax.min)
        : null;

    const groupLabelStyle = (groupLabel) ? groupLabel.style : {};
    const groupLabelStr = (groupLabel) ? groupLabel.label : '';
    const labelDisplay = ((labelRowMinMax.max - labelRowMinMax.min) > 2) ? 'string' : 'icon';

    const isLabelRow = (groupLabel && rowIndex === groupLabel.rowIndex + labelRowIndexOffset);

    if (fieldName && fieldName === DEBUG_FIELDNAME) {
        console.log(fieldName);
        console.log('----------------');
        console.log(`rowIndex: ${rowIndex}`);
        console.log(`label row index offset: ${labelRowIndexOffset}`);
        console.log('groupLabels');
        console.log(groupLabels);
        console.log(`groupIndex min: ${labelRowMinMax.min}, max: ${labelRowMinMax.max}`);
        console.log('pre-sort values object keys');
        console.log(objectKeys);
        console.log('sorted values object keys');
        console.log(sortedObjectKeys);
        console.log('values');
        console.log(values);
        console.log('group break indexes');
        console.log(groupBreakIndexes);
        if (offsetGroupBreakIndexes.length > 0) {
            console.log('group break offset indexes');
            console.log(offsetGroupBreakIndexes);
            console.log(offsetGroupBreakIndexes.indexOf(rowIndex));
        }
        console.log(groupLabelStyle);
        console.log(groupLabelStr);
        console.log('---------');
    }

    return (
        <td
            style={groupLabelStyle}
        >
            {isLabelRow && (
            <>
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
            </>
            )}
        </td>
    );
};

export default DataTableGroupBy;
