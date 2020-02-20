import React from 'react';
import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';

import PageTitle from '../../containers/PageTitle';

export default (props: any) => {
    const {
        sectionPlugins,
        pluginsWithErrors,
        handleSelectSection,
        renderPlugin
    } = props;

    let {
       selectedSection
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

    // TODO: Fix me! This console log should explain exactly what's going on...
    console.log('WorkSectionsLayout selectedSection: ' + selectedSection);

    const validSections = ['courts', 'jails', 'escortRuns', 'other'];
    selectedSection = (validSections.indexOf(selectedSection) > -1) ? selectedSection : 'courts';

    return (
        <Tab.Container
            id="profile-sections" // TODO: Change this ID!
            onSelect={(key: any) => handleSelectSection(key)}
            activeKey={selectedSection}
            key={selectedSection}
        >
            <Row className="clearfix">
                <Col sm={12}>
                    <Tab.Content animation={false}>
                        <Tab.Pane key={'courts'} eventKey={'courts'}>
                            <Row className="clearfix">
                                <Col sm={12} md={5}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Courtrooms`} />
                                    {courtroomsPlugin && renderPlugin(courtroomsPlugin)}
                                </Col>
                                <Col sm={12} md={7}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Court Roles`} />
                                    {courtRolesPlugin && renderPlugin(courtRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'jails'} eventKey={'jails'}>
                            <Row className="clearfix">
                                {/* <Col sm={12} md={6}>
                                    {courtroomsPlugin && renderPlugin(courtroomsPlugin)}
                                </Col> */}
                                <Col sm={12} md={6} mdPush={3}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Jail Roles`} />
                                    {jailRolesPlugin && renderPlugin(jailRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'escortRuns'} eventKey={'escortRuns'}>
                            <Row className="clearfix">
                                <Col sm={12} md={6} mdPush={3}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Escort Runs`} />
                                    {escortTypesPlugin && renderPlugin(escortTypesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'other'} eventKey={'other'}>
                            <Row className="clearfix">
                                <Col sm={12}  md={8} mdPush={2}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Other Assignments`} />
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
