import React from 'react';
import moment from 'moment';
import {
    Sheriff,
    Leave
} from '../../api/index';
import {
    Image,
    Table,
    Glyphicon
} from 'react-bootstrap';
import CourthouseDisplay from '../../containers/CourthouseDisplay';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import './SheriffProfile.css';
import toTitleCase from '../../infrastructure/toTitleCase';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import Popover from '../Popover';
export interface SheriffProfileDisplayProps {
    sheriff: Sheriff;
    leaves?: Leave[];
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
            },
            leaves = []
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
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map(l => {
                                return (
                                    <tr key={l.id}>
                                        <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                        <td>{moment(l.endDate).format('MMM D, YYYY')}</td>
                                        <td>{l.leaveTypeCode}</td>
                                        <td>
                                            {l.cancelDate && <Popover
                                                trigger={<Glyphicon style={{ color: 'red' }} glyph="ban-circle" />}
                                                title={'Leave Cancelled'}
                                                displayValue={
                                                    <span>
                                                        <b>Date: </b>{moment(l.cancelDate).format('MMM D, YYYY')}<br /> 
                                                        <b>Reason: </b>{l.cancelReasonCode}
                                                    </span>
                                                }
                                            />}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </Table>
                </CollapsibleSection>
            </div>
        );
    }
}