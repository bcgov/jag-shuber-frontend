import React from 'react';
import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';

import AdminFormSectionNav from '../../components/AdminForm/AdminFormSectionNav';

export default (props: any) => {
    const {
        selectedSection,
        sectionPlugins,
        pluginsWithErrors,
        handleSelectSection,
        renderPlugin
    } = props;

    const courtroomsPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_COURTROOMS');

    const courtRolesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_COURT_ROLES');

    const jailroomsPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_JAILROOMS');

    const jailRolesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_JAIL_ROLES');

    const escortTypesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_ESCORT_TYPES');

    const otherTypesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_PLUGIN_OTHER_TYPES');

    return (
        <Tab.Container
            id="profile-sections" // TODO: Change this ID!
            onSelect={(key: any) => handleSelectSection(key)}
            // activeKey={selectedSection}
            activeKey={'courts'}
        >
            <Row className="clearfix">
                <Col sm={12}>
                    <Tab.Content animation={false}>
                        <Tab.Pane key={'courts'} eventKey={'courts'}>
                            <Row className="clearfix">
                                <Col sm={12} md={7}>
                                    {courtroomsPlugin && renderPlugin(courtroomsPlugin)}
                                </Col>
                                <Col sm={12} md={5}>
                                    {courtRolesPlugin && renderPlugin(courtRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'jails'} eventKey={'jails'}>
                            <Row className="clearfix">
                                <Col sm={12} md={7}>
                                    {jailroomsPlugin && renderPlugin(jailroomsPlugin)}
                                </Col>
                                <Col sm={12} md={5}>
                                    {jailRolesPlugin && renderPlugin(jailRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'escortRuns'} eventKey={'escortRuns'}>
                            <Row className="clearfix">
                                <Col sm={12}>
                                    {escortTypesPlugin && renderPlugin(escortTypesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'other'} eventKey={'other'}>
                            <Row className="clearfix">
                                <Col sm={12}>
                                    {otherTypesPlugin && renderPlugin(otherTypesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};
