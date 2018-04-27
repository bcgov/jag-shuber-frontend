import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courthouse } from '../api/index';
import { allCourthouses } from '../modules/courthouse/selectors';

interface CourthouseListStateProps {
    courthouses: Courthouse[];
}

interface CourthouseListProps {
    onChange?: (id: string) => void;
}

class CourthouseList extends React.PureComponent<
    CourthouseListProps & CourthouseListStateProps> {

    render() {
        const { courthouses = [], onChange } = this.props;
        const selectorValues = Object.keys(courthouses).map((key, index) => ({ key, value: courthouses[key].name }));
        return (
            <select onChange={(ev) => onChange && onChange(ev.target.value)}>
                {selectorValues.map(sv => (
                    <option key={sv.key} value={sv.key}>{sv.value}</option>
                ))}
            </select>
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseListStateProps, {}, CourthouseListProps>(
    mapStateToProps
)(CourthouseList);