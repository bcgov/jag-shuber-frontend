import React from 'react';
import { IdType } from '../../api';
import { SheriffProfilePlugin } from './SheriffProfilePlugin';
import { InjectedFormProps } from 'redux-form';
import { Form } from 'react-bootstrap';

export interface SheriffProfileProps {
    sheriffId: IdType;
    isEditing: boolean;
    plugins?: SheriffProfilePlugin[];
}

export default class SheriffProfile extends React.PureComponent<InjectedFormProps<any, SheriffProfileProps> & SheriffProfileProps>{

    render() {
        const { sheriffId, isEditing = false, plugins = [] } = this.props;
        return (
            <div className="sheriff-profile">
                <Form>
                    {
                        plugins
                            .map(p => (
                                isEditing
                                    ? p.renderFormFields({ sheriffId })
                                    : p.renderDisplay({ sheriffId })
                            ))
                    }
                </Form>
            </div>
        );
    }
}

