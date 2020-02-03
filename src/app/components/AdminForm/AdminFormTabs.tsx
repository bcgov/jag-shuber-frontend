import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import React from 'react';

export default (props: any) => {
    const {
        selectedSection,
        sectionPlugins,
        pluginsWithErrors,
        AdminFormSectionNav,
        handleSelectSection,
        renderPlugin
    } = props;

    return (
        <Tab.Container
            id="profile-sections" // TODO: Change this ID!
            onSelect={(key: any) => handleSelectSection(key)}
            activeKey={selectedSection}
        >
            <Row className="clearfix">
                {sectionPlugins.length > 1 && (
                <Col sm={12}>
                    <Nav bsStyle="tabs">
                        {
                            sectionPlugins.map((p: any) => {
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
                )}
                <Col sm={12}>
                    <Tab.Content animation={false}>
                        {
                            sectionPlugins
                                .map((p: any) => (
                                    <Tab.Pane key={p.name} eventKey={p.name}>
                                        {renderPlugin(p)}
                                    </Tab.Pane>
                                ))
                        }
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};
