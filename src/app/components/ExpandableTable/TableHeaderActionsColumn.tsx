import { Button, FormGroup, Glyphicon } from 'react-bootstrap';
import HeaderSaveButton from '../../plugins/AdminRoles/containers/HeaderSaveButton';
import React from 'react';

const ExpandableTableHeaderActionsColumn = (props: any) => {
    const {
        displayActionsColumn = false,
        displayHeaderActions = false,
        displayHeaderSave = false,
        initialValue, buttonLabel,
        items = []
    } = props;

    return (
        <>
            {displayActionsColumn && (
                <th
                    style={{
                        width: '250px'
                    }}
                >
                    {displayHeaderActions && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <FormGroup style={{ flex: '0' }}>
                                <Button onClick={() => items.unshift(initialValue)}>
                                    <Glyphicon glyph="plus"/> {buttonLabel}
                                </Button>
                            </FormGroup>

                            {displayHeaderSave && (
                            <FormGroup style={{ flex: '0', marginLeft: '5px', marginRight: '5px' }}>
                                <HeaderSaveButton formName={'AdminForm'} />
                            </FormGroup>
                            )}
                        </div>
                    )}
                </th>
            )}
        </>
    );
};

export default ExpandableTableHeaderActionsColumn;
