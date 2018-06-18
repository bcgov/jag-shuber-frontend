import React from 'react';
import {
    NavItem
} from 'react-bootstrap';
import {
    Link,
    Route
} from 'react-router-dom';

interface NavigationLinkProps {
    to: string;
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
        const { to, exactMatch = false, label } = this.props;

        return (
            <Route
                path={to}
                exact={exactMatch}
                children={({ match }) => {
                    const isActive = match ? true : false;
                    return (
                        <NavItem
                            active={isActive}
                            componentClass={() => <Link to={to} onClick={(e) => this.handleClick(e)}>{label}</Link>}
                        />
                    );
                }}
            />
        );
    }
}

export default NavigationLink;