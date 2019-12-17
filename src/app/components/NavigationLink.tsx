import React from 'react';
import {
    NavItem
} from 'react-bootstrap';
import {
    Link,
    Route
} from 'react-router-dom';

interface NavigationLinkProps {
    path: string;
    label: string;
    exactMatch?: boolean;
    onSelect?: (key: any, event: any) => void;
    eventKey?: string;
}

class NavigationLink extends React.Component<NavigationLinkProps, {}> {
    private handleClick(event: any) {
        const { onSelect, eventKey } = this.props;

        if (onSelect) {
            onSelect(eventKey, event);
        }
    }

    render() {
        const { path, exactMatch = false, label, children } = this.props;

        return (
            <Route
                path={path}
                exact={exactMatch}
                children={({ match }) => {
                    const isActive = match ? true : false;
                    return (
                        <NavItem
                            active={isActive}
                            componentClass={() =>
                                <Link
                                    to={path}
                                    onClick={(e) => this.handleClick(e)}
                                >
                                    {label}
                                    {children}
                                </Link>}
                        />
                    );
                }}
            />
        );
    }
}

export default NavigationLink;
