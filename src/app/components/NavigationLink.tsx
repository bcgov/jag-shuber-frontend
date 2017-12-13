import * as React from 'react'
import {
    NavItem
} from 'react-bootstrap'
import {
    Link,
    Route,
    // withRouter
} from 'react-router-dom'

interface NavigationLinkProps{
    to: string;
    label: string;
    exactMatch?: boolean;
}

class NavigationLink extends React.Component<NavigationLinkProps, {}>{
    render() {
        const { to, exactMatch = false, label } = this.props;
        return (
            <Route path={to} exact={exactMatch} children={({match}) => {
                const isActive = match ? true :false;
                return (
                    <NavItem active={isActive} componentClass={()=><Link to={to}>{label}</Link>}/>                   
                )
            }} />
        )
    }
}

export default NavigationLink;