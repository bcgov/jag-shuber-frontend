import React from 'react';
import { connect } from 'react-redux';
import { allEffectiveGenderCodes } from '../modules/system/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { GenderCode } from '../api/Api';
import { RootState } from '../store';

interface GenderSelectorStateProps {
    genderCodes?: GenderCode[];
}

class GenderSelector extends React.PureComponent<
    GenderSelectorStateProps & SelectorProps> {

    render() {
        const { 
            genderCodes = [],
            label = 'Gender',
            ...rest
        } = this.props;
        const selectorValues = genderCodes.map(gender => ({ key: gender.code, value: gender.description }));
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
        genderCodes: allEffectiveGenderCodes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<GenderSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(GenderSelector);