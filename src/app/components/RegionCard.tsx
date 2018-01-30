import * as React from 'react';
import { REGION } from '../api'

export interface CourthouseCardProps {
    id?: string | number;
}

export default class CourthouseCard extends React.PureComponent<CourthouseCardProps, any> {
    render() {
        const { id } = this.props;
        return (
             id && REGION[id] 
        );
    }
}
