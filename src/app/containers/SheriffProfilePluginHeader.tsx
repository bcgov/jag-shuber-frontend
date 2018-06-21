import * as React from 'react';
import SheriffDisplay from './SheriffDisplay';
import toTitleCase from '../infrastructure/toTitleCase';

import {
    Image
} from 'react-bootstrap';
import { SheriffProfilePluginBase, SheriffProfilePluginProps } from '../components/SheriffProfile/SheriffProfilePlugin';
import { Sheriff } from '../api';




export default class SheriffProfilePluginHeader extends SheriffProfilePluginBase<Sheriff> {

    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                firstName = '',
                lastName = '',
                imageUrl = '',
            } = {} }) =>
                (
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
                )
            } />
    )

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                imageUrl = '',
            } = {} }) =>
                (
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <Image
                                src={imageUrl ? imageUrl : '/img/avatar.png'}
                                circle={true}
                                width="115"
                                height="115"
                            />
                        </div>
                    </div>
                )
            } />
    )
}
