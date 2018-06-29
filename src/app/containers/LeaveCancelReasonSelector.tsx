import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { StringMap } from '../api/index';
// import { allCourthouses } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveCancelCode } from '../api/Api';

interface LeaveCancelReasonSelectorStateProps {
    cancelTypes?: LeaveCancelCode[];
}

class LeaveCancelReasonSelector extends React.PureComponent<
    LeaveCancelReasonSelectorStateProps & SelectorProps> {

    render() {
        const { 
            cancelTypes = [
                {code: 'OPD', description: 'Cover Opperational Demands'},
                {code: 'PD', description: 'Personal Decision'},
                {code: 'ER', description: 'Entry Error'},
            ],
            ...rest
        } = this.props;
        const selectorValues = cancelTypes.map(cancel => ({ key: cancel.code, value: cancel.description }));
        return (
            <Selector 
                data={selectorValues} 
                {...rest}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        //courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveCancelReasonSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(LeaveCancelReasonSelector);