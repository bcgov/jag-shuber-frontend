import React from 'react';
// import { connect } from 'react-redux';
// import { RootState } from '../store';
// import { allEffectiveLeaveCancelCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
// import { LeaveCancelCode } from '../api/Api';

interface GenderSelectorStateProps {
    genderCodes?: any[];
}

export class GenderSelector extends React.PureComponent<
    GenderSelectorStateProps & SelectorProps> {

    render() {
        const { 
            genderCodes = [{code: 'M', description: 'Male'}, {code: 'F', description: 'Female'}, {code: 'O', description: 'Other'}],
            ...rest
        } = this.props;
        const selectorValues = genderCodes.map(gender => ({ key: gender.code, value: gender.description }));
        return (
            <Selector 
                data={selectorValues} 
                {...rest}
            />
        );
    }

}

// const mapStateToProps = (state: RootState) => {
//     return {
//         cancelCodes: allEffectiveLeaveCancelCodes()(state)
//     };
// };

// // tslint:disable-next-line:max-line-length
// export default connect<GenderSelectorStateProps, {}, SelectorProps>(
//     mapStateToProps
// )(LeaveCancelReasonSelector);