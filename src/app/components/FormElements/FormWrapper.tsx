import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { Alert } from 'react-bootstrap';

export interface FormWrapperProps {
}

export default class FormWrapper extends React.PureComponent<InjectedFormProps<any, any>> {
    render() {
        const { error, children } = this.props;
        return (
            <div>
                {error && (
                    <Alert bsStyle="danger">
                        <p>{error}</p>
                    </Alert>
                )}
                {children}
            </div>
        );
    }
}
