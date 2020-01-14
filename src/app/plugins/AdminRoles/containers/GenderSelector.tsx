import React from 'react';
import { connect } from 'react-redux';
import { allEffectiveGenderCodes } from '../../../modules/system/selectors';
import Selector, { SelectorProps } from '../../../components/FormElements/Selector';
import { GenderCode } from '../../../api/Api';
import { RootState } from '../../../store';

interface GenderSelectorStateProps {
    genders?: GenderCode[];
}

class GenderSelector extends React.PureComponent<GenderSelectorStateProps & SelectorProps> {

    render() {
        const {
            genders = [],
            ...restProps
        } = this.props;
        const selectorValues = genders.map(gender => ({ key: gender.code, value: gender.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        genders: allEffectiveGenderCodes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<GenderSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(GenderSelector);
