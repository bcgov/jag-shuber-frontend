import React from 'react';
import moment from 'moment';
import {
    Button, Glyphicon
} from 'react-bootstrap';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import { Location } from '../api';
import { createOrUpdateLeaves } from '../modules/leaves/actions';
import { RootState } from '../store';
import { getLocationById } from '../modules/system/selectors';

interface CancelLocationButtonProps {
    locationId: string;
}

interface CancelLocationButtonStateProps {
    location?: Location;
}
interface CancelLocationButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) => void;
    cancelLocation: (location: Location) => void;
}

type CancelButtonCompositProps = CancelLocationButtonProps & CancelLocationButtonDispatchProps & CancelLocationButtonStateProps;
class CancelLocationButton extends React.PureComponent<CancelButtonCompositProps> {

    async handleCancelLocation() {
        const { 
            location, 
            cancelLocation
        } = this.props;
        if (location) {
            const locationToCancel: Location = {
                ...location,
                cancelDate: moment().toISOString()
            };

            await cancelLocation(locationToCancel);
        }

    }

    render() {
        const { showConfirmationModal } = this.props;
        return (
            <Button
                bsStyle="danger"
                onClick={() => showConfirmationModal({
                    confirmBtnLabel: 'OK',
                    RenderComponent: ({ onValueChanged, value }) => (
                        <div>
                            <h3>are you sure?</h3>
                        </div>
                    ),
                    onConfirm: (value) => this.handleCancelLocation()
                })}
            >
                <Glyphicon glyph="ban-circle" />
            </Button>

        );
    }
}

export default connect<CancelLocationButtonStateProps, CancelLocationButtonDispatchProps, CancelLocationButtonProps, RootState>(
    (state, { locationId }) => {
        return {
            location: getLocationById(locationId)(state)
        };
    },
    {
        showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) =>
            ConfirmationModal.ShowAction<string>(props),
        cancelLeave: (locationToCancel) => createOrUpdateLeaves([locationToCancel])
    }
)(CancelLocationButton);
