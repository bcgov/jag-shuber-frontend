import React from 'react';
import { IdType } from '../../api';
import { SheriffProfilePlugin, SheriffProfileSectionPlugin } from './SheriffProfilePlugin';
import { InjectedFormProps } from 'redux-form';
import { Tab, Row, Col, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import Form from '../FormElements/Form';

export interface SheriffProfileProps {
    sheriffId: IdType;
    isEditing: boolean;
    plugins?: SheriffProfilePlugin<any>[];
    pluginsWithErrors?: { [key: string]: boolean };
    selectedSection?: string;
    onSelectSection?: (sectionName: string) => void;
    onSubmitSuccess?: () => void;
}

class SheriffProfileSectionNav extends React.PureComponent<{ title: string, hasErrors?: boolean }>{
    render() {
        const { title, hasErrors } = this.props;
        let className: string = '';
        let glyph: React.ReactNode;
        if (hasErrors === true) {
            className = 'text-danger';
            glyph = <Glyphicon glyph="exclamation-sign" />;
        } else if (hasErrors === false) {
            className = 'text-success';
            glyph = <Glyphicon glyph="ok" />;
        }
        return (
            <span className={className}>
                {title} {glyph}
            </span>
        );
    }
}

export default class SheriffProfile extends React.PureComponent<InjectedFormProps<any, SheriffProfileProps> & SheriffProfileProps>{
    private handleSelectSection(sectionName: string) {
        const { onSelectSection } = this.props;
        if (onSelectSection) {
            onSelectSection(sectionName);
        }
    }

    renderPlugins() {
        const {
            sheriffId,
            plugins = [],
            isEditing = false,
            pluginsWithErrors = {},
        } = this.props;
        let { selectedSection } = this.props;
        const nonSectionPlugins = plugins.filter(p => !(p instanceof SheriffProfileSectionPlugin));
        // tslint:disable-next-line:max-line-length
        const sectionPlugins = plugins.filter(p => p instanceof SheriffProfileSectionPlugin) as SheriffProfileSectionPlugin<any>[];
        selectedSection = selectedSection ? selectedSection : sectionPlugins[0].name;
        return (
            <div>
                {nonSectionPlugins.map(p => (
                    isEditing ? p.renderFormFields({ sheriffId }) : p.renderDisplay({ sheriffId })
                ))}
                <Tab.Container onSelect={(key: any) => this.handleSelectSection(key)} activeKey={selectedSection}>
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav bsStyle="tabs">
                                {
                                    sectionPlugins.map((p) => {
                                        return (
                                            <NavItem key={p.name} eventKey={p.name}>
                                                <SheriffProfileSectionNav title={p.title} hasErrors={pluginsWithErrors[p.name]} />
                                                {/* <span className={hasErrors ? 'text-danger' : 'text-success'}>
                                                    {p.title} {hasErrors ? <Glyphicon glyph="exclamation-sign" /> : <Glyphicon glyph="ok" />}
                                                </span> */}
                                            </NavItem>
                                        );
                                    })

                                }
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content animation={false}>
                                {
                                    sectionPlugins
                                        .map((p) => (
                                            <Tab.Pane eventKey={p.name}>
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