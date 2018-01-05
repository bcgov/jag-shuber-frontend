import * as React from 'react';
import { connect } from 'react-redux';
import { SheriffAssignment } from '../../../api/index';
import DropAssignmentList from '../components/DropAssignmentList';
import { RootState } from '../../../store/reducers';
import {linkedAssignments} from '../selectors';
import {linkAssignment} from '../actions';


export interface LinkedAssignmentListProps{
  assignments?:SheriffAssignment[];
  sheriffId:number;
  linkAssignment?:(assignment:SheriffAssignment)=>void;
}


class LinkedAssignmentList extends React.PureComponent<LinkedAssignmentListProps,any>{
  render(){
    const {assignments=[],linkAssignment} = this.props;    
    return (
      <DropAssignmentList onDropAssignment={linkAssignment} assignments={assignments}/>
    )
  }
}

const mapStateToProps = (state:RootState,props:LinkedAssignmentListProps) => {  
  const {sheriffId} = props;
  return {
    assignments:linkedAssignments(sheriffId)(state),
    sheriffId
  }
}

const mapDispatchToProps = (dispatch:any,ownProps:LinkedAssignmentListProps)=>{
  const {sheriffId}=ownProps;
  return {
    linkAssignment:(t:SheriffAssignment)=> dispatch(linkAssignment(t.id,sheriffId))
  }
}

const ConnectedLinkedAssignmentList = connect<LinkedAssignmentListProps,{},LinkedAssignmentListProps>(
  mapStateToProps,
  mapDispatchToProps
)(LinkedAssignmentList)

export default ConnectedLinkedAssignmentList;
