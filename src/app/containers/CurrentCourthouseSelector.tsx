import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courthouse, IdType } from '../api/index';
import { allCourthouses } from '../modules/courthouse/selectors';
import { FormControl } from 'react-bootstrap';
import { updateCurrentCourthouse } from '../modules/user/actions';

interface CourthouseListStateProps {
    courthouses: Courthouse[];
}

interface CurrentCourthouseSelectorDispatchProps {
    updateCurrentCourthouseId?: (id: IdType) => void;
}

interface CurrentCourthouseSelectorProps {
}

class CurrentCourthouseSelector extends React.PureComponent<
    CurrentCourthouseSelectorProps & CourthouseListStateProps & CurrentCourthouseSelectorDispatchProps> {

    private onChange(courthouseId: string) {
        const { updateCurrentCourthouseId } = this.props;
        
        if (updateCurrentCourthouseId) {
            updateCurrentCourthouseId(courthouseId);
        }
    }

    render() {
        const { courthouses = [] } = this.props;
        return (
            <FormControl
                componentClass="select"
                placeholder="select"
                onChange={(ev) => this.onChange((ev.target as any).value)}
            >
                <option value="">Select Courthouse</option>
                {courthouses.map(courthouse => (
                    <option
                        key={courthouse.id}
                        value={courthouse.id}
                    >
                        {courthouse.name}
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
export default connect<CourthouseListStateProps, CurrentCourthouseSelectorDispatchProps, CurrentCourthouseSelectorProps>(
    mapStateToProps,
    {
        updateCurrentCourthouseId: updateCurrentCourthouse
    }
)(CurrentCourthouseSelector);