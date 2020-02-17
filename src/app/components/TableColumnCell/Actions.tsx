import * as React from 'react';

import * as Types from './types';

// TODO: Move CancelledPopover out of here!
import CancelledPopover from '../../components/CancelledPopover';

import { ColumnRendererProps } from '../TableColumn';

export interface ActionProps extends ColumnRendererProps {}

export interface ActionColumnOptions extends Types.FieldColumnOptions {
    actions: React.ReactType<ActionProps>[];
}

const ActionsColumn = (options?: ActionColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const actions = (options && options.actions) ? options.actions : [];

    return {
        title: '',
        colStyle: colStyle,
        // TODO: Don't hardcode in the formName! This is just in here while I work on some save related stuff...
        FormRenderer: ({ fields, index, model, disabled }) => (
            <div className="action-buttons">
                {actions.map(action => {
                    const Action = action;
                    return <><Action fields={fields} index={index} model={model} /></>;
                })}
            </div>

        ),
        CanceledRender: ({ model }) => {
            if (!model) return null;
            return (
                <CancelledPopover model={model} />
            );
        }
    };
};

export default ActionsColumn;
