import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { TableColumnActionProps } from './index';

const EditRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <Button bsStyle="primary">
            <Glyphicon glyph="edit" />
        </Button>
    );
};

export default EditRow;
