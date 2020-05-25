import * as React from 'react';

import * as Types from './types';

// TODO: Move CancelledPopover out of here!
import CancelledPopover from '../../CancelledPopover';

import { ColumnRendererProps } from '../TableColumn';

export interface ActionProps extends ColumnRendererProps {}

export interface ActionColumnOptions extends Types.FieldColumnOptions {
    trace?: string;
    actions: React.ReactType<ActionProps>[];
}

const ActionsColumn = (options?: ActionColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const optActions = (options && options.actions) ? options.actions : [];

    return {
        title: '',
        colStyle: colStyle,
        actions: optActions,
        FormRenderer: ({ fields, index, model, disabled = false, actions = [] }) => {
            return (
                <div className="action-buttons">
                    {!disabled && actions && actions.map((action: React.ReactType<ActionProps>) => {
                        const Action = action;
                        return <><Action fields={fields} index={index} model={model} /></>;
                    })}
                </div>

            );
        },
        CanceledRender: ({ model }) => {
            if (!model) return null;
            return (
                <CancelledPopover model={model} />
            );
        }
    };
};

export default ActionsColumn;
