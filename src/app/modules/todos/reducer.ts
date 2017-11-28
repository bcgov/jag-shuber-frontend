import {combineReducers} from 'redux'
import { TodoContract } from './components/TodoList';

export interface  TodoState{
  todos:TodoContract[],
  visibilityFilter:string
}

const todos = (state = [], action:any) => {
    if(!action){
      return state;
    }
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map((todo:any) =>
          (todo.id === action.id) 
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }


  const visibilityFilter = (state = 'SHOW_ALL', action:any) => {
    if(!action){
      return state;
    }
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
  }

  export default combineReducers({
    list:todos,
    visibilityFilter
  });
  