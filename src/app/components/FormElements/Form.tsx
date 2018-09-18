import * as React from 'react';
import { Form as BootstrapForm, FormProps } from 'react-bootstrap';
import FormWrapper from './FormWrapper';
import { InjectedFormProps } from 'redux-form';

export default class Form extends React.PureComponent<FormProps & InjectedFormProps> {
    render() {
        const { children, handleSubmit, ...restProps } = this.props;
        return (
            <FormWrapper {...restProps as InjectedFormProps}>
                <BootstrapForm onSubmit={handleSubmit}>
                    {this.props.children}
                </BootstrapForm>
            </FormWrapper>
        );
    }
}
