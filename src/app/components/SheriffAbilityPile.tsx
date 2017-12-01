import * as React from 'react'
import {
    Glyphicon
} from 'react-bootstrap'

import { SheriffAbility } from '../api';

export default class SheriffAbilityPile extends React.PureComponent<{ abilities: SheriffAbility }, any>{
    render() {
        const { abilities } = this.props;
        let icons = [];
        if (abilities && SheriffAbility.CanTransfer) {
            icons.push(<Glyphicon glyph="road" title="Prisoner Transfer" />)
        }
        if (abilities && SheriffAbility.CourtAppearance) {
            icons.push(<Glyphicon glyph="queen" title="Court Appearance" />)
        }
        if (abilities && SheriffAbility.SignDocuments) {
            icons.push(<Glyphicon glyph="pencil" title="Sign Documents"/>)
        }
        return (
            <div style={{ whiteSpace:"nowrap",marginTop:5 }} >
                {icons.map((i,k) => (<span key={k} style={{margin:2,opacity:0.8,fontSize:18}}> {i} </span> ))}
            </div>
        );
    }
}