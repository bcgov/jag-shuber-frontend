import * as React from 'react'
import { connect } from 'react-redux'
import { Sheriff } from '../../../api/index';
import {default as SheriffGrid} from '../components/SheriffGrid'
import {getSheriffList} from '../actions'
import { RootState } from '../../../store/reducers';
import {sheriffs,isLoading} from '../selectors'

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
  return {
    sheriffs:sheriffs(state),
    loading:isLoading(state)    
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

export default ConnectedOnDutySherrifs;