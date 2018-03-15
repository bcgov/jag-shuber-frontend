import * as React from 'react';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { getSheriff } from '../modules/sheriffs/selectors';
import { Sheriff } from '../api/Api';
import SheriffDisplay from '../components/SheriffDisplay';

interface ConnectedSheriffDisplayProps {
    sheriffId?: number;
    RenderComponent?: React.ComponentType<SheriffDisplayProps>;
}
interface SheriffDisplayProps {
    sheriff?: Sheriff;
}

class ConnectedSheriffDisplay extends React.PureComponent<ConnectedSheriffDisplayProps & SheriffDisplayProps> {

    render() {
        const {
            RenderComponent = SheriffDisplay,
            sheriff
        } = this.props;
        return (
            <RenderComponent sheriff={sheriff} />
        );
    }
}

const mapStateToProps = (state: RootState, props: ConnectedSheriffDisplayProps) => {
    const { sheriffId } = props;
    const sheriff = getSheriff(sheriffId)(state);
    return {
        sheriff
    };
};

export default connect<SheriffDisplayProps, {}, ConnectedSheriffDisplayProps>
    (mapStateToProps)(ConnectedSheriffDisplay);