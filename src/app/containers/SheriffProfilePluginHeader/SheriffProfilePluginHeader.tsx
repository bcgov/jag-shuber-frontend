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
            } = {} }) =>
                (
                    <div className="sheriff-profile-header">
                        <Image
                            src={imageUrl ? imageUrl : '/img/avatar.png'}
                            circle={true}
                            width="115"
                            height="115"
                        />
                        <h3 style={{ paddingTop: 8 }} className="sheriff-name">
                            {`${lastName.toUpperCase()}, ${toTitleCase(firstName)}`}
                        </h3>
                    </div>
                )
            }
        />
    )

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                imageUrl = '',
            } = {} }) =>
                (
                    <div style={{ padding: 10, textAlign: 'center' }}>
                        <Image
                            src={imageUrl ? imageUrl : '/img/avatar.png'}
                            circle={true}
                            width="115"
                            height="115"
                        />
                    </div>
                )
            } 
        />
    )
}
