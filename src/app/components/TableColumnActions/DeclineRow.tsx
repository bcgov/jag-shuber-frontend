import * as React from 'react';

import CancelButton from '../../containers/CancelButton';
import { TableColumnActionProps } from './index';

const DeclineRow = ({ model }: TableColumnActionProps) => {
    return (
        <CancelButton modelId={model.id} />
    );
};

export default DeclineRow;
