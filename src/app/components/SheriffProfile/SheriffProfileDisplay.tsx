import * as React from 'react';
import { Sheriff } from '../../api/index';
import {
    Image,
    Table
} from 'react-bootstrap';
import CourthouseDisplay from '../../containers/CourthouseDisplay';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import './SheriffProfile.css';
import toTitleCase from '../../infrastructure/toTitleCase';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
export interface SheriffProfileDisplayProps {
    sheriff: Sheriff;
    // sheriff leaves array
}

export default class SheriffProfileDisplay extends React.PureComponent<SheriffProfileDisplayProps, {}> {

    render() {
        const {
            sheriff: {
                firstName,
                lastName,
                imageUrl,
                badgeNo,
                alias,
                homeCourthouseId = '',
                rankCode = '',
                currentCourthouseId = ''
            }
        } = this.props;

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <div>
                        <Image src={imageUrl ? imageUrl : '/img/avatar.png'} circle={true} width="115" height="115" />
                    </div>
                    <div className="sheriff-profile-name-heading">
                        {`${lastName.toUpperCase()}, ${toTitleCase(firstName)}`}
                    </div>
                </div>

                <CollapsibleSection sectionTitle="Identification" isInitiallyCollapsed={false}>
                    <Table responsive={true} >
                        <tbody>
                            <tr>
                                <td><strong>Rank</strong></td>
                                <td><SheriffRankDisplay code={rankCode} /></td>
                            </tr>
                            <tr>
                                <td><strong>Badge No</strong></td>
                                <td>{badgeNo}</td>
                            </tr>
                            <tr>
                                <td><strong>Alias</strong></td>
                                <td>{alias ? alias : '-'}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CollapsibleSection>

                <CollapsibleSection sectionTitle="Location">
                    <Table responsive={true} >
                        <tbody>
                            <tr>
                                <td><strong>Home Location</strong></td>
                                <td><CourthouseDisplay id={homeCourthouseId} /></td>
                            </tr>
                            <tr>
                                <td><strong>Current Location</strong></td>
                                <td><CourthouseDisplay id={currentCourthouseId} /></td>
                            </tr>
                        </tbody>
                    </Table>
                </CollapsibleSection>

                <CollapsibleSection sectionTitle="Leave">
                    <Table responsive={true} striped={true} >
                        <thead>
                            <tr>
                                <th className="text-left">Start Date</th>
                                <th className="text-left">End Date</th>
                                <th className="text-left">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nov 12, 2018</td>
                                <td>Nov 16, 2018</td>
                                <td>STIP</td>
                            </tr>
                            <tr>
                                <td>Dec 10, 2018</td>
                                <td>Dec 27, 2018</td>
                                <td>Annual Leave</td>
                            </tr>
                        </tbody>
                    </Table>
                </CollapsibleSection>
            </div>
        );
    }
}