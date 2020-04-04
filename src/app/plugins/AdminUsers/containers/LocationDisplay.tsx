import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../../components/FormElements/Selector';

import { Location } from '../../../api';

import { RootState } from '../../../store';
import { getAllLocations } from '../../../modules/system/selectors';

interface LocationDisplayStateProps {
    locations?: Location[];
    input?: any;
}

class LocationDisplay extends React.PureComponent<
    LocationDisplayStateProps & SelectorProps> {

    render() {
        const {
            locations = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = locations.map(location => ({
                key: location.id as string,
                value: location.name as string
            }));

            const match = values.find((item) => item.key === value);

            if (match) {
                return (
                    <span className="table-cell-text">{match.value}</span>
                );
            }
        }

        return <span className="table-cell-text">Not Specified</span>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        locations: getAllLocations(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LocationDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(LocationDisplay);
