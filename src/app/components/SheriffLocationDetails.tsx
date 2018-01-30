import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Table
} from 'react-bootstrap';
import CourthouseCard from './CourthouseCard';
import RegionCard from './RegionCard';

export interface SheriffLocationDetailsProps {
    sheriff: Sheriff;
}

export default class SheriffLocationDetails extends React.Component<SheriffLocationDetailsProps, any>{
    render() {
        const { sheriff: { currentCourthouse, currentRegion, permanentCourthouse, permanentRegion } } = this.props;
        return (
            <div>
                <h3>Region and Courthouse</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th className="text-left">Courthouse</th>
                            <th className="text-left">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Permanent</strong></td>
                            <td><CourthouseCard id={permanentCourthouse}/></td>
                            <td><RegionCard id={permanentRegion} /></td>
                        </tr>
                        <tr>
                            <td><strong>Current</strong></td>
                            <td><CourthouseCard id={currentCourthouse}/></td>
                            <td><RegionCard id={currentRegion} /></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}