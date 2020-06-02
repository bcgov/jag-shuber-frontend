import * as React from 'react';

import SaveButton from '../../../containers/SaveButton';
import { TableColumnActionProps } from './index';

const SaveRow = ({ model }: TableColumnActionProps) => {
    if (!model) return null;
    return (
        <SaveButton formName={'AdminForm'} modelId={model.id} model={model} />
    );
};

export default SaveRow;
