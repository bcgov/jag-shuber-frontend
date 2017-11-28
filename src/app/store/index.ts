import {createStore,applyMiddleware} from 'redux'
import {default as thunk,ThunkAction} from 'redux-thunk'
import reducers from './reducers'
import {default as api,API} from '../api'


const initialState:any = {
    todos:{
        list:[
            {
                id:0,
                text:"Hello Todo",
                completed:false
            },
            {
                id:1,
                text:"Hello Todo 2",
                completed:false
            },
            {
                id:2,
                text:"Hello Todo 3",
                completed:false
            },
            {
                id:3,
                text:"Hello Todo 4",
                completed:false
            },
            {
                id:4,
                text:"Hello Todo 5",
                completed:false
            }
        ]
    }
}

export type ThunkAction<R,S> = ThunkAction<R,S,{api:API}>;

const store = createStore(reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument({api}))
);

export default store;