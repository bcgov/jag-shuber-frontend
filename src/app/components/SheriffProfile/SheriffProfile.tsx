import React from 'react';
import { IdType } from '../../api';
import { SheriffProfilePlugin, SheriffProfileSectionPlugin } from './SheriffProfilePlugin';
import { InjectedFormProps } from 'redux-form';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Form from '../FormElements/Form';

export interface SheriffProfileProps {
    sheriffId: IdType;
    isEditing: boolean;
    plugins?: SheriffProfilePlugin<any>[];
}

export default class SheriffProfile extends React.PureComponent<InjectedFormProps<any, SheriffProfileProps> & SheriffProfileProps>{

    renderPlugins() {
        const { sheriffId, plugins = [], isEditing = false } = this.props;
        const nonSectionPlugins = plugins.filter(p => !(p instanceof SheriffProfileSectionPlugin));
        const sectionPlugins = plugins.filter(p => p instanceof SheriffProfileSectionPlugin) as SheriffProfileSectionPlugin<any>[];
        return (
            <div>
                {nonSectionPlugins.map(p => (
                    isEditing ? p.renderFormFields({ sheriffId }) : p.renderDisplay({ sheriffId })
                ))}
                <Tab.Container defaultActiveKey={0}>
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav bsStyle="tabs">
                                {
                                    sectionPlugins.map((p, i) => (
                                        <NavItem eventKey={i}>{p.title}</NavItem>
                                    ))
                                }
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content animation={false}>
                                {
                                    sectionPlugins
                                        .map((p, i) => (
                                            <Tab.Pane eventKey={i}>
                                                {
                                                    isEditing
                                                        ? p.renderFormFields({ sheriffId })
                                                        : p.renderDisplay({ sheriffId })
                                                }
                                            </Tab.Pane>
                                        ))
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }

    renderForm() {
        return (
            <Form {...this.props}>
                {this.renderPlugins()}
            </Form>
        );
    }

    renderDisplay() {
        return this.renderPlugins();
    }

    render() {
        const { isEditing = false } = this.props;
        return (
            <div className="sheriff-profile">
                {isEditing ? this.renderForm() : this.renderDisplay()}
            </div>
        );
    }
}