import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const UnexpireRow = ({ model, onClick, fields, index , showComponent = false }: TableColumnActionProps) => {
    if (!showComponent) return null;
    const handleClick = () => {
        if (onClick && model) onClick(model);

        const row: any = fields.get(index);
        if (row.hasOwnProperty('isExpired')) {
            row.isExpired = false;
            row.expiryDate = null;
        }

        fields.remove(index);
        fields.insert(index, row);
    };

    return (
        <Button bsStyle="info" onClick={handleClick}>
            <Glyphicon glyph="repeat" />
        </Button>
    );
};

export default UnexpireRow;
