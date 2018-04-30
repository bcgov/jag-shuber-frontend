import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    Courthouse, 
    IdType 
} from '../api/Api';
import { allCourthouses } from '../modules/courthouse/selectors';

interface CourthouseDisplayListStateProps {
    courthouses: Courthouse[];
}

interface CourthouseDisplayListProps {
    id: IdType;
}

class CourthouseDisplay extends React.PureComponent<
    CourthouseDisplayListProps & CourthouseDisplayListStateProps> {

    render() {
        const { courthouses = [], id } = this.props;
        return (
               id ? courthouses[id].name : 'not selected'
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseDisplayListStateProps, {}, CourthouseDisplayListProps>(
    mapStateToProps
)(CourthouseDisplay);