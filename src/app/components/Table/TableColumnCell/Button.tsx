import * as React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

const ButtonColumn = (label?: string, icon?: string, options?: Types.FieldColumnOptions, onButtonClicked?: any): Types.TableColumnCell => {
    label = label || 'Button';

    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: '',
        colStyle: colStyle,
        FormRenderer: ({ fieldInstanceName, model, callbackContext, disabled }) => {
            const handleClick = (onButtonClicked)
                ? (ev: React.SyntheticEvent<any>) => {
                    onButtonClicked(ev, callbackContext, model);
                }
                : () => {};

            return !model || !model.id ? (
                <div style={{ display: 'flex', alignItems: 'center' }} />
            )
            :
            (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        bsClass="btn btn-info"
                        onClick={handleClick}>
                        {icon && (
                            <><Glyphicon glyph={icon} /> {label}</>
                        )}

                        {!icon && (
                            <>{label}</>
                        )}
                    </Button>
                </div>
            );
        },
        CanceledRender: ({ model }) => (
            <div />
        )
    };
};

export default ButtonColumn;
