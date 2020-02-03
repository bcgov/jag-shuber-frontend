import { Button, FormGroup, Glyphicon } from 'react-bootstrap';
import React from 'react';

const ExpandableTableRowExpandColumn = (props: any) => {
    const {
        id,
        index,
        expandable = false,
        // tslint:disable-next-line:no-empty
        onExpandRowClicked = () => {},
        expandedRows = []
    } = props;

    return expandable
        ? (
            <td>
                <FormGroup>
                    <Button
                        bsStyle="link"
                        onClick={() => onExpandRowClicked(index)}
                        style={{color: '#666666'}}
                    >
                        {id && expandedRows && !expandedRows.has(index) && (
                            <Glyphicon glyph="triangle-right"/>
                        )}
                        {id && expandedRows && expandedRows.has(index) && (
                            <Glyphicon glyph="triangle-bottom"/>
                        )}
                    </Button>
                </FormGroup>
            </td>
        ) : null;
};

export default ExpandableTableRowExpandColumn;
