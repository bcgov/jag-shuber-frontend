import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { DateType } from '../api/Api';
import { createDefaultDuties as createDefaultDutiesAction } from '../modules/assignments/actions';

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

        const importConfirmationMessage =
            // tslint:disable-next-line:max-line-length
            <p style={{ fontSize: 14 }}>{`Would you like to import default duties for ${moment(date).format('MMM DD, YYYY')}?`}</p>;

        return (
            <div style={{position: 'absolute', right: 2}}>
                <ConfirmationModal
                    title="Import Default Duties"
                    message={importConfirmationMessage}
                    actionBtnClassName="action-button"
                    actionBtnLabel={<span> Import Defaults</span>}
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
export default connect<{}, ImportDefaultDutiesModalDispatchProps, ImportDefaultDutiesModalProps>(null, { createDefaultDuties: createDefaultDutiesAction })(ImportDefaultDutiesModal);