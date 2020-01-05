import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../../components/FormElements/Selector';

import { GenderCode } from '../../../api';

import { RootState } from '../../../store';
import { allEffectiveGenderCodes, allGenderCodes } from '../../../modules/system/selectors';

interface GenderDisplayStateProps {
    genders?: GenderCode[];
    input?: any;
}

class GenderDisplay extends React.PureComponent<
    GenderDisplayStateProps & SelectorProps> {

    render() {
        const {
            genders = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = genders.map(gender => ({
                key: gender.code as string,
                value: gender.description as string
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
        genders: allGenderCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<GenderDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(GenderDisplay);
