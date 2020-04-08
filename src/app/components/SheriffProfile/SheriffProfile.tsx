import React from 'react';
import { IdType } from '../../api';
import { SheriffProfilePlugin, SheriffProfilePluginProps, SheriffProfileSectionPlugin } from './SheriffProfilePlugin';
import { InjectedFormProps } from 'redux-form';
import { Tab, Row, Col, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import Form from '../FormElements/Form';
import './SheriffProfile.css';

export interface SheriffProfileProps {
    sheriffId?: IdType;
    isEditing?: boolean;
    plugins?: SheriffProfilePlugin<any>[];
    pluginsWithErrors?: { [key: string]: boolean };
    selectedSection?: string;
    onSelectSection?: (sectionName: string) => void;
    onSubmitSuccess?: () => void;
    pluginPermissions?: any;
    pluginAuth?: any[];
    initialValues?: any;
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

export default class SheriffProfile extends React.Component<InjectedFormProps<any, SheriffProfileProps> & SheriffProfileProps>{
    private handleSelectSection(sectionName: string) {
        const { onSelectSection } = this.props;
        if (onSelectSection) {
            onSelectSection(sectionName);
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any){
        return true;
    }

    renderPlugin(plugin: SheriffProfilePlugin) {
        const {
            sheriffId,
            initialValues = {},
            isEditing = false,
            pluginPermissions,
            pluginAuth,
        } = this.props;

        const pluginProps: SheriffProfilePluginProps = {
            sheriffId,
            data: initialValues[plugin.name],
            pluginPermissions: pluginPermissions[plugin.name],
            pluginAuth: pluginAuth,
        };

        // Set the plugin's permissions
        plugin.pluginPermissions = pluginPermissions[plugin.name];

        return isEditing
            ? plugin.renderFormFields(pluginProps)
            : plugin.renderDisplay(pluginProps);
    }

    renderPlugins() {
        const {
            plugins = [],
            pluginsWithErrors = {},
        } = this.props;
        let { selectedSection } = this.props;

        const nonSectionPlugins = plugins.filter(p => !(p instanceof SheriffProfileSectionPlugin));
        // tslint:disable-next-line:max-line-length
        const sectionPlugins = plugins.filter(p => p instanceof SheriffProfileSectionPlugin) as SheriffProfileSectionPlugin<any>[];

        selectedSection = selectedSection
            ? selectedSection
            : sectionPlugins[0] && sectionPlugins[0]
                ? sectionPlugins[0].name
                : undefined;

        return (
            <div>

                <Tab.Container
                    id="profile-sections"
                    onSelect={(key: any) => this.handleSelectSection(key)}
                    activeKey={selectedSection}
                >
                    <Row className="clearfix">
                        <Col md={12} lg={4}>
                            {nonSectionPlugins.map((p) => this.renderPlugin(p))}
                        </Col>
                        <Col md={12} lg={8}>
                            <Nav bsStyle="tabs">
                                {
                                    sectionPlugins.map((p) => {
                                        return (
                                            <NavItem key={p.name} eventKey={p.name}>
                                                <SheriffProfileSectionNav
                                                    title={p.title}
                                                    hasErrors={pluginsWithErrors[p.name]}
                                                />
                                            </NavItem>
                                        );
                                    })
                                }
                            </Nav>
                            <Tab.Content animation={false}>
                                {
                                    sectionPlugins
                                        .map((p) => (
                                            <Tab.Pane key={p.name} eventKey={p.name}>
                                                {this.renderPlugin(p)}
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
