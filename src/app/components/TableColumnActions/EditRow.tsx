import * as React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TableColumnActionProps } from './index';

const EditRow = ({ model, onClick}: TableColumnActionProps) => {
    const handleClick = () => {
        if (onClick) onClick(model);
    };

    return (
        <OverlayTrigger overlay={(<Tooltip>Edit</Tooltip>)} placement={'left'}>
            <Button bsStyle="primary" onClick={handleClick}>
                <Glyphicon glyph="edit" />
            </Button>
        </OverlayTrigger>
    );
};

export default EditRow;
