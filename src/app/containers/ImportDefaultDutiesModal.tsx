import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { ConfirmationModal } from '../components/ConfirmationModal';
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
            <p style={{ fontSize: 14 }}>Would you like to add your default duties to the Duty Roster?</p>;

        return (
            <div>
                <ConfirmationModal
                    title="Import Default Duties"
                    message={importConfirmationMessage}
                    actionBtnLabel={<Glyphicon glyph="import" style={{color}}/>}
                    actionBtnStyle="link"
                    actionBtnSize="large"
                    confirmBtnLabel="Yes"
                    confirmBtnStyle="success"
                    cancelBtnLabel="No"
                    onCancel={() => (null)}
                    onConfirm={() => (null)}
                />
            </div>
        );
    }
}