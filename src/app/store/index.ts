import {createStore,applyMiddleware,compose} from 'redux'
import {default as thunk,ThunkAction as _ThunkAction} from 'redux-thunk'
import {default as reducers,RootState} from './reducers'
import {default as api,API} from '../api'

export type ThunkAction<T> = (args?:T)=>_ThunkAction<any,RootState,{api:API}>;

let thisWindow:any = window;

const composeEnhancers = thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(
        thunk.withExtraArgument({api})
    )
)

const store = createStore(reducers,enhancers);

export default store;