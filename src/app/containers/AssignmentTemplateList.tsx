import * as React from 'react'
import { connect } from 'react-redux'
import { AssignmentTemplate } from '../api/index';
import { RootState } from '../store';
import {getAssignmentTemplates} from '../modules/assignments/actions'
import {allAssignmentTemplates, isLoadingAssignments} from '../modules/assignments/selectors'
import AssignmentDefaultList from '../components/AssignmentDefaultList';

export interface AssignmentTemplateListProps{
  getAssignmentTemplates:any;
  templates:AssignmentTemplate[]
  loading:boolean;
}


class AssignmentTemplateList extends React.Component<AssignmentTemplateListProps,any>{
  componentWillMount(){
    const {getAssignmentTemplates} = this.props;
    getAssignmentTemplates();
  }

  render(){
    const {templates=[], loading=true} = this.props;
    
    if(loading){
      return (
        <div>Loading...</div>
      )
    };
    
    return (
        <AssignmentDefaultList templates={templates} />
    )
  }
}

const mapStateToProps = (state:RootState) => {  
  return {
    templates:allAssignmentTemplates(state),
    loading:isLoadingAssignments(state)    
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    getAssignmentTemplates:()=>dispatch(getAssignmentTemplates())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentTemplateList);