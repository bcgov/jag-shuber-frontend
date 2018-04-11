import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
// import ScheduleShiftEditForm from './ScheduleShiftEditForm';
import { ConfirmationModal } from '../components/ConfirmationModal';
// import { connect } from 'react-redux';
// import { deleteShift } from '../modules/shifts/actions';
import { DateType } from '../api/Api';
export interface ImportDefaultDutiesModalProps {
    date: DateType;
    color?: string;
}

export interface ImportDefaultDutiesModalDispatchProps {
    // importDuties: () => void;
}

export default class ScheduleShiftEditModal extends React.PureComponent<
    ImportDefaultDutiesModalProps & ImportDefaultDutiesModalDispatchProps>{

    render() {
        const {
            color = 'white',
            // tslint:disable-next-line:no-shadowed-variable
            // importDuties
        } = this.props;

        const importConfirmationMessage =
            <p style={{ fontSize: 14 }}>Would you like to import your default duties?</p>;

        return (
            <div>
                <ConfirmationModal
                    message={importConfirmationMessage}
                    actionBtnLabel={<Glyphicon glyph="import" style={{color}}/>}
                    actionBtnStyle="link"
                    actionBtnSize="large"
                    confirmBtnLabel="Yes"
                    cancelBtnLabel="No"
                    onCancel={() => (null)}
                    onConfirm={() => (null)}
                />
            </div>
        );
    }
}

// tslint:disable-next-line:max-line-length
// export default connect<{}, ImportDefaultDutiesModalDispatchProps, ImportDefaultDutiesModalProps>(null, { deleteShift })(ScheduleShiftEditModal);