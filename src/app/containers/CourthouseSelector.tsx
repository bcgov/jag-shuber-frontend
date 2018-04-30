import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courthouse } from '../api/index';
import { allCourthouses } from '../modules/courthouse/selectors';
import { FormControl } from 'react-bootstrap';
import { 
    getCourtrooms, 
    getRuns
} from '../modules/courthouse/action';
import {
    getSheriffList
} from '../modules/sheriffs/actions';
import api from '../api/index';
import Client from '../api/Client';
interface CourthouseListStateProps {
    courthouses: Courthouse[];
}

interface CourthouseListDispatchProps {
    fetchCourtrooms: () => void;
    fetchSheriffs: () => void;
    fetchRuns: () => void;
}

interface CourthouseListProps {
    onChange?: (id: string) => void;
}

class CourthouseList extends React.PureComponent<
    CourthouseListProps & CourthouseListStateProps & CourthouseListDispatchProps> {

    private onChange(courthouseId: string) {
        const { onChange, fetchCourtrooms, fetchRuns, fetchSheriffs } = this.props;
        (api as Client).setCurrentCourthouse(courthouseId);
        fetchCourtrooms();
        fetchRuns();
        fetchSheriffs();
        if (onChange) {
            onChange(courthouseId);
        }
    }

    render() {
        const { courthouses = [] } = this.props;
        const selectorValues = Object.keys(courthouses).map((key, index) => ({ key, value: courthouses[key].name }));
        return (
            <FormControl
                componentClass="select"
                placeholder="select"
                onChange={(ev) => this.onChange((ev.target as any).value)}
            >
                <option value="">Select Courthouse</option>
                {selectorValues.map(sv => (
                    <option
                        key={sv.key}
                        value={sv.key}
                    >
                        {sv.value}
                    </option>
                ))}
            </FormControl>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseListStateProps, CourthouseListDispatchProps, CourthouseListProps>(
    mapStateToProps, 
    {
        fetchCourtrooms: getCourtrooms,
        fetchRuns: getRuns,
        fetchSheriffs: getSheriffList
    }
)(CourthouseList);