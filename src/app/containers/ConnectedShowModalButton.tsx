import * as React from 'react';
import { Button } from 'react-bootstrap';
import { show as showModal } from 'redux-modal';
import { connect } from 'react-redux';

interface ShowModalConnectProps {
    modalName: string;
    modalProps?: any;
}

interface ShowModalDispatchProps {
    showModal: (name: string, props?: any) => void;
}

export const ConnectedShowModalButton = connect<{}, ShowModalDispatchProps, ShowModalConnectProps>(
    undefined,
    { showModal }
)(
    class ShowModalButton extends React.PureComponent<ShowModalConnectProps & ShowModalDispatchProps>{
        render() {
            const { showModal: show, modalName, modalProps, children } = this.props;
            return (
                <Button onClick={() => show(modalName, modalProps)}>{children}</Button>
            );
        }
    }
)