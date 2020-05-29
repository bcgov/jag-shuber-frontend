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
        .find((p: any) => p.name === 'ADMIN_COURTROOMS');

    const courtRolesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_COURT_ROLES');

    const jailroomsPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_JAILROOMS');

    const jailRolesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_JAIL_ROLES');

    const escortTypesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_ESCORT_TYPES');

    const otherTypesPlugin = sectionPlugins
        .find((p: any) => p.name === 'ADMIN_OTHER_TYPES');

    const validSections = ['ADMIN_COURTROOMS', 'ADMIN_COURT_ROLES', 'ADMIN_JAIL_ROLES', 'ADMIN_ESCORT_TYPES', 'ADMIN_OTHER_TYPES'];
    selectedSection = (validSections.indexOf(selectedSection) > -1) ? selectedSection : 'ADMIN_COURTROOMS';

    return (
        <Tab.Container
            id="profile-sections" // TODO: Change this ID!
            onSelect={(key: any) => {
                console.log('WorkSectionsLayout handleSelectSection');
                handleSelectSection(key);
            }}
            activeKey={selectedSection}
            key={selectedSection}
        >
            <Row className="clearfix">
                <Col sm={12}>
                    <Tab.Content animation={false}>
                        {/* Use className if you want to use col-xl-* prefixed columns, react-bootstrap doesn't support xl cols */}
                        <Tab.Pane key={'ADMIN_COURTROOMS'} eventKey={'ADMIN_COURTROOMS'}>
                            <Row className="clearfix">
                                <Col sm={12} lg={8} lgPush={2}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Courtrooms`} />
                                    {courtroomsPlugin && renderPlugin(courtroomsPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'ADMIN_COURT_ROLES'} eventKey={'ADMIN_COURT_ROLES'}>
                            <Row className="clearfix">

                                <Col sm={12} lg={8} lgPush={2}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Court Roles`} />
                                    {courtRolesPlugin && renderPlugin(courtRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'ADMIN_JAIL_ROLES'} eventKey={'ADMIN_JAIL_ROLES'}>
                            <Row className="clearfix">
                                <Col sm={12} lg={8} lgPush={2}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Jail Roles`} />
                                    {jailRolesPlugin && renderPlugin(jailRolesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'ADMIN_ESCORT_TYPES'} eventKey={'ADMIN_ESCORT_TYPES'}>
                            <Row className="clearfix">
                                <Col sm={12} lg={8} lgPush={2}>
                                    <PageTitle title={({ currentLocationName }: any) => `${currentLocationName} Escort Runs`} />
                                    {escortTypesPlugin && renderPlugin(escortTypesPlugin)}
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane key={'ADMIN_OTHER_TYPES'} eventKey={'ADMIN_OTHER_TYPES'}>
                            <Row className="clearfix">
                                <Col sm={12} lg={8} lgPush={2}>
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
