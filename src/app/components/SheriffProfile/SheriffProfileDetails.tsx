import * as React from 'react';
import { Sheriff } from '../../api/index';
import {
    Image,
    Table
} from 'react-bootstrap';
import CourthouseDisplay from '../../containers/CourthouseDisplay';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import { Collapse } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import './SheriffProfile.css';
import toTitleCase from '../../infrastructure/toTitleCase';
export interface SheriffProfileDetailsProps {
    sheriff: Sheriff;
    isCompactView?: boolean;
    isIdentificationInitiallyCollapsed?: boolean;
    isLocationInitiallyCollapsed?: boolean;
    isLeaveInitiallyCollapsed?: boolean;
}

export default class SheriffProfileDetails extends
    React.PureComponent<SheriffProfileDetailsProps, 
            { isIdentificationCollapsed: boolean, isLocationCollapsed: boolean, isLeaveCollapsed: boolean }> {

    constructor(props: any, context: any) {
        super(props, context);
        const { 
            isIdentificationInitiallyCollapsed: isIdentificationCollapsed = true, 
            isLocationInitiallyCollapsed: isLocationCollapsed = true,
            isLeaveInitiallyCollapsed: isLeaveCollapsed = true 
        } = props;
        this.state = { isIdentificationCollapsed, isLocationCollapsed, isLeaveCollapsed };
    }

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

        const {
            isIdentificationCollapsed,
            isLocationCollapsed,
            isLeaveCollapsed
        } = this.state;
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
                <div
                    className="sheriff-profile-section-header"
                    style={isIdentificationCollapsed ? {} : { border: 0 }}
                    onClick={() => this.setState({ isIdentificationCollapsed: !this.state.isIdentificationCollapsed })}
                >
                    Identification
                    <Glyphicon 
                        className="sheriff-profile-section-arrow" 
                        glyph={!isIdentificationCollapsed ? 'chevron-down' : 'chevron-up'} 
                    />
                </div>
                <Collapse in={!isIdentificationCollapsed}>
                    <div>
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
                    </div>
                </Collapse>

                <div
                    className="sheriff-profile-section-header"
                    style={isLocationCollapsed ? {} : { border: 0 }}
                    onClick={() => this.setState({ isLocationCollapsed: !this.state.isLocationCollapsed })}
                >
                    Location
                    <Glyphicon 
                        className="sheriff-profile-section-arrow" 
                        glyph={!isLocationCollapsed ? 'chevron-down' : 'chevron-up'}
                    />
                </div>
                <Collapse in={!isLocationCollapsed}>
                    <div>
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
                    </div>
                </Collapse>

                <div
                    className="sheriff-profile-section-header"
                    style={isLeaveCollapsed ? {} : { border: 0 }}
                    onClick={() => this.setState({ isLeaveCollapsed: !this.state.isLeaveCollapsed })}
                >
                    Leave
                    <Glyphicon 
                        className="sheriff-profile-section-arrow" 
                        glyph={!isLeaveCollapsed ? 'chevron-down' : 'chevron-up'} 
                    />
                </div>
                <Collapse in={!isLeaveCollapsed}>
                    <div>
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
                    </div>
                </Collapse>

            </div>
        );
    }
}