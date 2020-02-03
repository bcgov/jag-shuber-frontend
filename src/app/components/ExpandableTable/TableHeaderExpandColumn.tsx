import { Button, FormGroup, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';

const ExpandableTableHeaderExpandColumn = (props: any) => {
    const { expandable } = props;
    return expandable
    ? (
        <th style={{width: '60px'}}>
            <FormGroup style={{ textAlign: 'left' }}>
                <Button
                    bsStyle="link"
                    onClick={(e) => e.preventDefault()}
                    style={{color: '#666666'}}
                >
                    <OverlayTrigger overlay={(<Tooltip>Use the <Glyphicon glyph="triangle-right" /> to expand and collapse row details</Tooltip>)} placement={'right'}>
                        <Glyphicon glyph="info-sign" />
                    </OverlayTrigger>
                </Button>
            </FormGroup>
        </th>
    ) : null;
};

export default ExpandableTableHeaderExpandColumn;
