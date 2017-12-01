import {createStore,applyMiddleware,compose} from 'redux'
import {default as thunk,ThunkAction as _ThunkAction} from 'redux-thunk'
import {default as reducers,RootState} from './reducers'
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

export type ThunkAction = ()=>_ThunkAction<any,RootState,{api:API}>;

let thisWindow:any = window;

const composeEnhancers = thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(
        thunk.withExtraArgument({api})
    )
)

const store = createStore(reducers,initialState,enhancers);

export default store;