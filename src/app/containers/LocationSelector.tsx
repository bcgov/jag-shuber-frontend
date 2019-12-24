import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Location } from '../api';
import { allLocations } from '../modules/system/selectors';
import { currentLocation as currentLocationSelector } from '../modules/user/selectors';
import { updateCurrentLocation } from '../modules/user/actions';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface LocationSelectorStateProps {
    locations?: Location[];
}

class LocationSelector extends React.PureComponent<LocationSelectorStateProps & SelectorProps> {

    render() {
        const { locations = [], label = 'Location', ...rest } = this.props;
        const selectorValues = locations
            .map(location => ({ key: location.id, value: location.name }))

        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  Just keep an eye out for ALL_LOCATIONS in the Client.
        selectorValues.unshift({ key: 'ALL_LOCATIONS', value: 'All Locations' });

        return (
            <Selector
                data={selectorValues}
                label={label}
                {...rest}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        locations: allLocations(state)
    };
};

// tslint:disable-next-line:max-line-length
const ConnectedLocationSelector = connect<LocationSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(LocationSelector);

const ConnectedSystemLocationSelector :React.ComponentType =
connect<{ value: any }, { onChange: (v: any) => void }, {}, RootState>(
    (state) => ({ value: currentLocationSelector(state) }),
    { onChange: updateCurrentLocation }
)(ConnectedLocationSelector as any);

export default class extends ConnectedLocationSelector {

    /**
     * Returns a LocationSelector component that is connected to the state
     * of the systems Current Location.
     *
     * @static
     */
    static Current = ConnectedSystemLocationSelector;
}
