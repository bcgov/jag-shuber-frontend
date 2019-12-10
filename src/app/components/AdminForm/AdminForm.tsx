import React from 'react';
import { IdType } from '../../api';
import { FormContainer, FormContainerProps, FormContainerBase } from '../Form/FormContainer';
import { InjectedFormProps } from 'redux-form';
import { Tab, Row, Col, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import Form from '../FormElements/Form';
import './AdminForm.css';

export interface AdminFormProps {
    sheriffId?: IdType;
    isEditing?: boolean;
    plugins?: FormContainerBase[];
    text?: string;
    pluginsWithErrors?: { [key: string]: boolean };
    selectedSection?: string;
    onSelectSection?: (sectionName: string) => void;
    onSubmitSuccess?: () => void;
    initialValues?: any;
}

class AdminFormSectionNav extends React.PureComponent<{ title: string, hasErrors?: boolean }>{
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

export default class AdminForm extends React.Component<InjectedFormProps<any, AdminFormProps> & AdminFormProps>{
    private handleSelectSection(sectionName: string) {
        const { onSelectSection } = this.props;
        if (onSelectSection) {
            onSelectSection(sectionName);
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any){
        return true;
    }

    renderPlugin(plugin: FormContainer) {
        const { initialValues = {}, isEditing = false } = this.props;
        const pluginProps: FormContainerProps = {
            // sheriffId,
            data: initialValues[plugin.name]
        };
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
        const nonSectionPlugins = plugins.filter(p => !(p instanceof FormContainerBase));
        // tslint:disable-next-line:max-line-length
        const sectionPlugins = plugins.filter(p => p instanceof FormContainerBase) as FormContainerBase<any>[];
        selectedSection = selectedSection ? selectedSection : sectionPlugins[0] ? sectionPlugins[0].name : ''; // No selected key
        return (
            <div>
                {nonSectionPlugins.map((p) => this.renderPlugin(p))}
                <Tab.Container
                    id="profile-sections"
                    onSelect={(key: any) => this.handleSelectSection(key)}
                    activeKey={selectedSection}
                >
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav bsStyle="tabs">
                                {
                                    sectionPlugins.map((p) => {
                                        return (
                                            <NavItem key={p.name} eventKey={p.name}>
                                                <AdminFormSectionNav
                                                    title={p.title}
                                                    hasErrors={pluginsWithErrors[p.name]}
                                                />
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
