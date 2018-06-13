import React from 'react';
import SheriffDisplay from '../SheriffDisplay';
import { SheriffProfilePluginProps } from '../../components/SheriffProfile/SheriffProfilePlugin';
import {
    Image, Table
} from 'react-bootstrap';
import toTitleCase from '../../infrastructure/toTitleCase';
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection';
import SheriffRankDisplay from '../SheriffRankDisplay';

export default class SheriffProfileInfoPluginDisplay extends React.PureComponent<SheriffProfilePluginProps> {

    render() {
        const { sheriffId } = this.props;
        return (
            <SheriffDisplay
                sheriffId={sheriffId}
                RenderComponent={({ sheriff: {
                    firstName = '',
                    lastName = '',
                    imageUrl = '',
                    rankCode = '',
                    badgeNo = '',
                    alias = undefined
                } = {} }) =>
                    (
                        <div>
                            <div style={{ textAlign: 'center' }}>
                                <br />
                                <div>
                                    <Image
                                        src={imageUrl ? imageUrl : '/img/avatar.png'}
                                        circle={true}
                                        width="115"
                                        height="115"
                                    />
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
                        </div>
                    )
                }
            />
        );
    }
}