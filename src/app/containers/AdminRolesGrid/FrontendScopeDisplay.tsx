import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { FrontendScope } from '../../api';

import { RootState } from '../../store';
import { getAllFrontendScopes } from '../../modules/roles/selectors';

interface FrontendScopeDisplayStateProps {
    frontendScopes?: FrontendScope[];
    input?: any;
}

class FrontendScopeDisplay extends React.PureComponent<
    FrontendScopeDisplayStateProps & SelectorProps> {

    render() {
        const {
            frontendScopes = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = frontendScopes.map(scope => ({
                key: scope.id as string,
                value: scope.scopeName as string
            }));

            const match = values.find((item) => item.key === value);

            if (match) {
                return (
                    <h6 className="table-cell-text">{match.value}</h6>
                );
            }
        }

        return <h6>Not Specified</h6>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        frontendScopes: getAllFrontendScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<FrontendScopeDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(FrontendScopeDisplay);
