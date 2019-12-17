import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { FrontendScope } from '../../api';

import { RootState } from '../../store';
import { getAllFrontendScopes } from '../../modules/roles/selectors';

interface FrontendScopeDescriptionDisplayStateProps {
    frontendScopes?: FrontendScope[];
    input?: any; // TODO: Type this?
}

class FrontendScopeDescriptionDisplay extends React.PureComponent<
    FrontendScopeDescriptionDisplayStateProps & SelectorProps> {

    render() {
        const {
            frontendScopes = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = frontendScopes.map(frontendScope => ({
                key: frontendScope.id as string,
                value: frontendScope.description as string
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
        frontendScopes: getAllFrontendScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<FrontendScopeDescriptionDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(FrontendScopeDescriptionDisplay);
