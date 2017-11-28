let nextTodoId = 6
export const addTodo = (text:string) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter:boolean) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id:number) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}