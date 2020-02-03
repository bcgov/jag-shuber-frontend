import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';

const ExpandableTableHeaderColumns = (props: any) => {
    const { columns = [] } = props;
    return (
        <>
        {columns.map((col: any, colIndex: any) => (
            <th className="text-left" key={colIndex} style={col.colStyle}>
                {col.title}&nbsp;{col.displayInfo && (
                    <OverlayTrigger
                        overlay={(<Tooltip>This field is for...</Tooltip>)}
                        placement={'top'}>
                        <Glyphicon glyph="info-sign"/>
                    </OverlayTrigger>
                )}
            </th>
        ))}
        </>
    );
};

export default ExpandableTableHeaderColumns
