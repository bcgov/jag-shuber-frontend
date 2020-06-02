import { Button, FormGroup, Glyphicon } from 'react-bootstrap';
import React from 'react';

interface DataTableExpansionColProps {
    fieldIndex: any;
    expandable: boolean;
    expandedRows?: Set<number>;
    onExpandRowClicked?: (rowIdx: number) => void;
}

const DataTableExpansionCol = (props: DataTableExpansionColProps) => {
    const {
        fieldIndex,
        expandable = false,
        expandedRows = new Set<number>(),
        onExpandRowClicked = () => {}
    } = props;

    const handleOnExpandRowClicked = () => onExpandRowClicked(fieldIndex);

    return (
        <td>
            <FormGroup>
                <Button
                    bsStyle="link"
                    onClick={handleOnExpandRowClicked}
                    style={{color: '#666666'}}
                >
                    {expandable && expandedRows && !expandedRows.has(fieldIndex) && (
                        <Glyphicon glyph="triangle-right"/>
                    )}
                    {expandable && expandedRows && expandedRows.has(fieldIndex) && (
                        <Glyphicon glyph="triangle-bottom"/>
                    )}
                </Button>
            </FormGroup>
        </td>
    );
};

export default DataTableExpansionCol;
