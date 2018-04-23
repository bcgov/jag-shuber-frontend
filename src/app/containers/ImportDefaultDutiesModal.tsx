import * as React from 'react';
import { connect } from 'react-redux';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { DateType } from '../api/Api';
import { createDefaultDuties } from '../modules/assignments/actions';

export interface ImportDefaultDutiesModalProps {
    date: DateType;
    color?: string;
}

export interface ImportDefaultDutiesModalDispatchProps {
    createDefaultDuties: (date: DateType) => void;
}

class ImportDefaultDutiesEditModal extends React.PureComponent<
    ImportDefaultDutiesModalProps & ImportDefaultDutiesModalDispatchProps>{

    render() {
        const {
            color = 'white',
            // tslint:disable-next-line:no-shadowed-variable
            createDefaultDuties,
            date
        } = this.props;

        const importConfirmationMessage =
            <p style={{ fontSize: 14 }}>Would you like to add your default duties to the Duty Roster?</p>;

        return (
            <div style={{position: 'absolute', right: 2}}>
                <ConfirmationModal
                    title="Import Default Duties"
                    message={importConfirmationMessage}
                    actionBtnLabel={<span style={{color}} > Import Defaults</span>}
                    actionBtnStyle="link"
                    confirmBtnLabel="Yes"
                    confirmBtnStyle="success"
                    cancelBtnLabel="No"
                    onConfirm={() => {
                        createDefaultDuties(date);
                    }}
                />
            </div>
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<{}, ImportDefaultDutiesModalDispatchProps, ImportDefaultDutiesModalProps>(null, { createDefaultDuties })(ImportDefaultDutiesEditModal);