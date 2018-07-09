import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courthouse } from '../api';
import { allCourthouses } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface CourthouseSelectorStateProps {
    courthouses?: Courthouse[];
}

class CourthouseSelector extends React.PureComponent<CourthouseSelectorStateProps & SelectorProps> {

    render() {
        const { courthouses = [], label = 'Location', ...rest} = this.props;
        const selectorValues = courthouses.map(courthouse => ({ key: courthouse.id, value: courthouse.name }));
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
        courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(CourthouseSelector);