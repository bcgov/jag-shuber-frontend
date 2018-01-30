import * as React from 'react';
import { COURTHOUSES } from '../api'

export interface CourthouseCardProps {
    id?: string | number;
}

export default class CourthouseCard extends React.PureComponent<CourthouseCardProps, any> {
    render() {
        const { id } = this.props;
        return (
            <div>
                {id && COURTHOUSES[id]}
            </div>
        );
    }
}
