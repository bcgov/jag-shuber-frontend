import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { TableColumnActionProps } from './index';

const EditRow = ({ model, onClick}: TableColumnActionProps) => {
    const handleClick = () => {
        if (onClick) onClick(model);
    };

    return (
        <Button bsStyle="primary" onClick={handleClick}>
            <Glyphicon glyph="edit" />
        </Button>
    );
};

export default EditRow;
