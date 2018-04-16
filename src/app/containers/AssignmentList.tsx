import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Assignment } from '../api/index';
import {
  allAssignments,
  isLoadingAssignments
} from '../modules/assignments/selectors';
import { getAssignments } from '../modules/assignments/actions';
import AssignmentDefaultList from '../components/AssignmentDefaultList';
import { 
  getCourtrooms, 
  getAlternateAssignmentTypes,
  getJailRoles,
  getRuns 
} from '../modules/courthouse/action';

interface AssignmentTemplateListDispatchProps {
  getAssignments?: () => void;
  getCourtrooms?: () => void;
  getAlternateAssignmentTypes?: () => void;
  getJailRoles?: () => void;
  getRuns?: () => void; 
}

interface AssignmentTemplateListStateProps {
  assignments: Assignment[];
}
interface AssignmentTemplateListProps {
  assignments?: Assignment[];
  loading?: boolean;
}
class AssignmentTemplateList
  extends React.PureComponent<AssignmentTemplateListProps
  & AssignmentTemplateListDispatchProps
  & AssignmentTemplateListStateProps> {

  componentWillMount() {
    // tslint:disable-next-line:no-shadowed-variable
    const { getAssignments, getCourtrooms, getJailRoles, getRuns, getAlternateAssignmentTypes } = this.props;
    /* tslint:disable:no-unused-expression */
    getAssignments && getAssignments();
    getCourtrooms && getCourtrooms();
    getAlternateAssignmentTypes && getAlternateAssignmentTypes();
    getJailRoles && getJailRoles();
    getRuns && getRuns();
    /* tslint:enable:no-unused-expression */
  }

  render() {
    const { assignments = [], loading = true } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <AssignmentDefaultList assignments={assignments} />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    assignments: allAssignments(state),
    loading: isLoadingAssignments(state)
  };
};

const mapDispatchToProps = {
  getAssignments: getAssignments,
  getCourtrooms: getCourtrooms,
  getAlternateAssignmentTypes: getAlternateAssignmentTypes,
  getJailRoles: getJailRoles,
  getRuns: getRuns
};

// tslint:disable-next-line:max-line-length
export default connect<AssignmentTemplateListStateProps, AssignmentTemplateListDispatchProps, AssignmentTemplateListProps>(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentTemplateList);