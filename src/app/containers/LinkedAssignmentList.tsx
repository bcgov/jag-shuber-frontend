// import * as React from 'react';
// import { connect } from 'react-redux';
// import { Assignment } from '../api/index';
// import AssignmentDropList from './AssignmentDropList';
// import { RootState } from '../store';
// import { linkedAssignments } from '../modules/assignments/selectors';


// export interface LinkedAssignmentListProps {
//   assignments?: Assignment[];
//   sheriffId: number;
// }


// class LinkedAssignmentList extends React.PureComponent<LinkedAssignmentListProps, any>{
//   render() {
//     const { sheriffId, assignments = [] } = this.props;
//     return (
//       <AssignmentDropList assignmentGroupId={sheriffId} assignments={assignments} />
//     )
//   }
// }

// const mapStateToProps = (state: RootState, props: LinkedAssignmentListProps) => {
//   const { sheriffId } = props;
//   return {
//     assignments: linkedAssignments(sheriffId)(state),
//     sheriffId
//   }
// }


// const ConnectedLinkedAssignmentList = connect<LinkedAssignmentListProps, {}, LinkedAssignmentListProps>(
//   mapStateToProps
// )(LinkedAssignmentList)

// export default ConnectedLinkedAssignmentList;
