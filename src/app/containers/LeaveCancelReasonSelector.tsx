import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { allLeaveCancelCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveCancelCode } from '../api/Api';

interface LeaveCancelReasonSelectorStateProps {
    cancelCodes?: LeaveCancelCode[];
}

class LeaveCancelReasonSelector extends React.PureComponent<
    LeaveCancelReasonSelectorStateProps & SelectorProps> {

    render() {
        const { 
            cancelCodes = [
                {code: 'OPD', description: 'Cover Opperational Demands'},
                {code: 'PD', description: 'Personal Decision'},
                {code: 'ER', description: 'Entry Error'},
            ],
            ...rest
        } = this.props;
        const selectorValues = cancelCodes.map(cancel => ({ key: cancel.code, value: cancel.description }));
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
        cancelCodes: allLeaveCancelCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveCancelReasonSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(LeaveCancelReasonSelector);