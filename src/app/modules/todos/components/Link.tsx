import *  as React from 'react'
import * as PropTypes from 'prop-types'
import { PureComponent } from 'react';

export interface LinkProps {
    active: boolean
    onClick: () => void
}

class Link extends PureComponent<LinkProps, any>{
    static propTypes = {
        active: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    }
    render() {
        const { active, children, onClick } = this.props;

        if (active) {
            return <span>{children}</span>
        }
        return (
            <a
                href=""
                onClick={e => {
                    e.preventDefault()
                    onClick()
                }}
            >
                {children}
            </a>
        )
    }
}

export default Link