import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    GenderCode
} from '../api/Api';
import { genderCodesMap } from '../modules/system/selectors';

interface GenderCodeDisplayStateProps {
    genderCode?: GenderCode;
}

interface GenderCodeDisplayProps {
    code?: string;
}

class GenderCodeDisplay extends React.PureComponent<
    GenderCodeDisplayProps & GenderCodeDisplayStateProps> {

    render() {
        const { genderCode } = this.props;
        const displayValue = genderCode ? genderCode.description : '-';
        return (
            <span className="table-cell-text">{displayValue}</span>
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<GenderCodeDisplayStateProps, {}, GenderCodeDisplayProps, RootState>(
    (state: RootState, {code}) => {
        return {
            genderCode: code ? genderCodesMap(state)[code] : undefined
        };
    },
    {}
)(GenderCodeDisplay);
