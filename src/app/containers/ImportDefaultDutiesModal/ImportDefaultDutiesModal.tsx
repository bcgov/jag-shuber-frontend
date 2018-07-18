import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { DateType } from '../../api/Api';
import { createDefaultDuties as createDefaultDutiesAction } from '../../modules/assignments/actions';
import Toggle from '../../components/Toggle/Toggle';
import './ImportDefaultDutiesModal.css';

export interface ImportDefaultDutiesModalProps {
    date: DateType;
    color?: string;
}

export interface ImportDefaultDutiesModalDispatchProps {
    createDefaultDuties: (date: DateType) => void;
}

class ImportDefaultDutiesModal extends React.PureComponent<
    ImportDefaultDutiesModalProps & ImportDefaultDutiesModalDispatchProps>{

    render() {
        const {
            createDefaultDuties,
            date
        } = this.props;

        let importDuties = true;
        let importAnticipatedAssignments = true; 

        const importConfirmationMessage = 
        // tslint:disable-next-line:jsx-wrap-multiline
            <div>
                <div className="import-default-toggle">
                    Default Duties
                    <Toggle
                        defaultChecked={true}
                        onChange={() => importDuties = !importDuties}
                        checkedLabel={''}
                        uncheckedLabel={''}
                    />
                </div>
                <div className="import-default-toggle">
                    Anticipated Sheriff Assignments
                    <Toggle
                        defaultChecked={true}
                        onChange={() => importAnticipatedAssignments = !importAnticipatedAssignments}
                        checkedLabel={''}
                        uncheckedLabel={''}
                    />
                </div>
            </div>;

        return (
            <div style={{ position: 'absolute', right: 2 }}>
                <ConfirmationModal
                    title={`Import Settings - ${moment(date).format('MMM DD, YYYY')}`}
                    message={importConfirmationMessage}
                    actionBtnClassName="action-button"
                    actionBtnLabel="Import"
                    confirmBtnLabel="OK"
                    confirmBtnStyle="success"
                    onConfirm={() => {
                        createDefaultDuties(date);
                    }}
                />
            </div>
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<{}, ImportDefaultDutiesModalDispatchProps, ImportDefaultDutiesModalProps>(null, { createDefaultDuties: createDefaultDutiesAction })(ImportDefaultDutiesModal);