import * as React from 'react';
import SheriffDisplay from '../SheriffDisplay';
import toTitleCase from '../../infrastructure/toTitleCase';
import {
    Image
} from 'react-bootstrap';
import {
    SheriffProfilePluginBase,
    SheriffProfilePluginProps
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import { Sheriff } from '../../api';
import './SheriffProfilePluginHeader.css';
import avatarImg from '../../assets/images/avatar.png';
import SheriffRankDisplay from '../SheriffRankDisplay';

export default class SheriffProfilePluginHeader extends SheriffProfilePluginBase<Sheriff> {
    name = 'header';
    formFieldNames = {
    };
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                firstName = '',
                lastName = '',
                imageUrl = '',
                badgeNo = '',
                rankCode = ''
            } = {} }) =>
                (
                    <div className="sheriff-profile-header">
                        <Image
                            src={imageUrl ? imageUrl : avatarImg}
                            circle={true}
                            width="115"
                            height="115"
                        />
                        <div style={{ marginTop: 30, fontSize: 14 }}>#{badgeNo}</div>
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                        </div>
                        <div style={{ fontSize: 14 }}><SheriffRankDisplay code={rankCode} /></div>
                    </div>
                )
            }
        />
    )

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                firstName = '',
                lastName = '',
                imageUrl = '',
                badgeNo = '',
                rankCode = ''
            } = {} }) =>
                (
                    <div style={{ padding: 10, textAlign: 'center' }}>
                        <Image
                            src={imageUrl ? imageUrl : avatarImg}
                            circle={true}
                            width="115"
                            height="115"
                        />
                        <div style={{ marginTop: 30, fontSize: 14 }}>#{badgeNo}</div>
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                        </div>
                        <div style={{ fontSize: 14 }}><SheriffRankDisplay code={rankCode} /></div>
                    </div>
                )
            }
        />
    )
}
