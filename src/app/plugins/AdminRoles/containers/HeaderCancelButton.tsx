import React from 'react';
import {
    Button, Glyphicon
} from 'react-bootstrap';
import {
    reset
} from 'redux-form';
import { connect } from 'react-redux';
import { ButtonProps } from 'react-bootstrap';

export interface CancelButtonProps extends Partial<ButtonProps> {
    model?: any;
    modelId?: string;
    formName: string;
    reset?: () => void;
    onCancel?: () => void;
    // TODO: Fix this... getting an error...
    // Type 'React.CSSProperties | undefined' is not assignable to type 'React.CSSProperties | undefined'. Two different types with this name exist, but they are unrelated.
    // style?: any; // React.CSSProperties;
}

class CancelButton extends React.PureComponent<CancelButtonProps> {
    private handleCancel() {
        const { reset, onCancel } = this.props;
        if (reset) {
            reset();
        }
        if (onCancel) {
            onCancel();
        }
    }
    render() {
        const { formName, model, reset, children = 'Cancel', style = {}, ...rest } = this.props;
        const { bsStyle = 'sanger' } = rest;

        return (
            <Button
                bsStyle="danger"
                onClick={() => this.handleCancel()}
            >
                <Glyphicon glyph="ban-circle" /> Cancel
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: CancelButtonProps) => {
    return {
        reset: () => dispatch(reset(ownProps.formName))
    };
};

export default connect<CancelButtonProps>(null, mapDispatchToProps)(CancelButton);
