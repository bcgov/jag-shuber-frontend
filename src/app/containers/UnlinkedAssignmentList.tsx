// import * as React from 'react';
// import { connect } from 'react-redux';
// import { Assignment } from '../api/index';
// import {getAssignments} from '../modules/assignments/actions';
// import { RootState } from '../store';
// import {unlinkedAssignments,isLoadingAssignments} from '../modules/assignments/selectors';
// import AssignmentDropList from './AssignmentDropList';


// export interface UnlinkedAssignmentListProps{
//   getAssignmentList:any;
//   assignments:Assignment[];
//   loading:boolean;
// }


// class UnassignedAssignmentList extends React.Component<UnlinkedAssignmentListProps,any>{
//   componentWillMount(){
//     const {getAssignmentList} = this.props;
//     getAssignmentList();
//   }

//   render(){
//     const {assignments=[],loading=true} = this.props;
    
//     if(loading){
//       return (
//         <div>Loading...</div>
//       )
//     };
    
//     return (
//       <AssignmentDropList assignmentGroupId={-1} assignments={assignments}/>
//     )
//   }
// }

// const mapStateToProps = (state:RootState) => {  
//   return {
//     assignments:unlinkedAssignments(state),
//     loading:isLoadingAssignments(state)    
//   }
// }

// const mapDispatchToProps = (dispatch:any) => {
//   return {
//     getAssignmentList:()=>dispatch(getAssignments())
//   }
// }

// const ConnectedUnlinkedAssignmentList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(UnassignedAssignmentList)

// export default ConnectedUnlinkedAssignmentList;