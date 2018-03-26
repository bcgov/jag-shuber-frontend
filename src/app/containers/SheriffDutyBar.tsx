import { RootState } from '../store';
import { connect } from 'react-redux';
import { getSheriff } from '../modules/sheriffs/selectors';
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../components/SheriffDutyBar/SheriffDutyBar';

const mapStateToProps = (state: RootState, props: SheriffDutyBarProps) => {
    const { sheriffId } = props;
    const sheriff = getSheriff(sheriffId)(state);
    const title = sheriff == null ? "" : `${sheriff.lastName}, ${sheriff.firstName.charAt(0)}`;
    return {
        title,
        ...props
    };
}

export default connect<SheriffDutyBarProps,{},SheriffDutyBarProps>(mapStateToProps)(SheriffDutyBar);