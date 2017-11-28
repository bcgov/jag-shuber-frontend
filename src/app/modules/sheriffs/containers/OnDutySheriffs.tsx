import * as React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Sheriff } from '../../../api/index';
import {default as SheriffGrid} from '../components/SheriffGrid'
import {getSheriffList} from '../actions'
import { RootState } from '../../../store/reducers';

// const getVisibleTodos = (todos:any, filter:string) => {
//   switch (filter) {
//     case 'SHOW_COMPLETED':
//       return todos.filter((t:any) => t.completed)
//     case 'SHOW_ACTIVE':
//       return todos.filter((t:any) => !t.completed)
//     case 'SHOW_ALL':
//     default:
//       return todos
//   }
// }


export interface OnDutySheriffProps{
  getSheriffList:any;
  sheriffs:Sheriff[]
  loading:boolean
}


class OnDutySheriffs extends React.Component<OnDutySheriffProps,any>{
  componentWillMount(){
    const {getSheriffList} = this.props;
    getSheriffList();
  }

  render(){
    const {sheriffs=[],loading=true} = this.props;
    
    if(loading){
      return (
        <div>Loading...</div>
      )
    };
    
    return (
      <SheriffGrid sheriffs={sheriffs}/>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  const {sheriffs:{list:sheriffs,loading}} = state;
  return {
    sheriffs,
    loading    
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    getSheriffList:()=>dispatch(getSheriffList())
  }
}


const ConnectedOnDutySherrifs = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnDutySheriffs)

export default DragDropContext(HTML5Backend)(ConnectedOnDutySherrifs);