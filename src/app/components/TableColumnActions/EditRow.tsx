import * as React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TableColumnActionProps } from './index';

const EditRow = ({ model, onClick}: TableColumnActionProps) => {
    const handleClick = () => {
        if (onClick && model) onClick(model);
    };

    return (
        <OverlayTrigger overlay={(<Tooltip>Edit</Tooltip>)} placement={'left'}>
            <Button bsStyle="info" onClick={handleClick}>
                <Glyphicon glyph="edit" />
            </Button>
        </OverlayTrigger>
    );
};

export default EditRow;
