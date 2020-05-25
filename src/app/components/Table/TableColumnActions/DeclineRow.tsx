import * as React from 'react';

import CancelButton from '../../../containers/CancelButton';
import { TableColumnActionProps } from './index';

const DeclineRow = ({ model }: TableColumnActionProps) => {
    if (!model) return null;
    return (
        <CancelButton modelId={model.id} />
    );
};

export default DeclineRow;
