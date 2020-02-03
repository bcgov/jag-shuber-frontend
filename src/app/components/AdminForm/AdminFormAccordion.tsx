import React from 'react';
import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';

import * as ExpandableTable from '../ExpandableTable';

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
        <div>
            <ExpandableTable.Table
                id="profile-sections" // TODO: Change this ID!
                onSelect={(key: any) => handleSelectSection(key)}
                activeKey={selectedSection}
            >
                {/* <ExpandableTable.Header />
                <ExpandableTable.Body /> */}

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

                <ExpandableTable.HeaderExpandColumn />
                <ExpandableTable.HeaderColumns />
                <ExpandableTable.HeaderActionsColumn />

                <ExpandableTable.RowExpandColumn />
                <ExpandableTable.RowColumns />
                <ExpandableTable.RowActionsColumn />
                <ExpandableTable.Row />

                {
                    sectionPlugins
                        .map((p: any) => (
                            <Tab.Pane key={p.name} eventKey={p.name}>
                                {renderPlugin(p)}
                            </Tab.Pane>
                        ))
                }
            </ExpandableTable.Table>
        </div>
    );
};
