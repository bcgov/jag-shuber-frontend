import { FieldsProps } from 'redux-form';

import ApproveRow from './ApproveRow';
import CancelRow from './CancelRow';
import DeclineRow from './DeclineRow';
import DeleteRow from './DeleteRow';
import EditRow from './EditRow';
import ExpireRow from './ExpireRow';
import RemoveRow from './RemoveRow';
import SaveRow from './SaveRow';

export interface TableColumnActionProps {
    fields: FieldsProps<Partial<any>>;
    index: number;
    model?: Partial<any>;
    onClick?: (ev: any) => void;
    showComponent?: boolean;
}

export { ApproveRow, CancelRow, DeclineRow, DeleteRow, EditRow, ExpireRow, RemoveRow, SaveRow };
