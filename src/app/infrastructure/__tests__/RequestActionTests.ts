import { registerMiddlewares } from 'redux-actions-assertions';
import thunk from 'redux-thunk';
import {
    default as RequestAction,
    RequestActionState
} from '../Requests/RequestActionBase';
import fetchMock from 'fetch-mock';
import { API } from '../../api';
import { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import NestedReducer from '../NestedReducer';

registerMiddlewares([thunk]);

interface Widget {
    id: number;
    title: string;
}

interface WidgetRootState {
    list?: RequestActionState<Widget[]>
    create?: RequestActionState<Widget>
    infos?: {
        message: string
    }
}

class FetchWidgets extends RequestAction<{}, Widget[], WidgetRootState>{
    public async doWork(request: {}, extra: { api: API; }, getState: () => any): Promise<Widget[]> {
        const res = await fetch('/api/widgets');
        const body = await res.json() as Widget[];
        return body;
    }
    constructor() {
        super({namespace:"widgets", actionName:"list"});
    }
}

class CreateWidget extends RequestAction<Partial<Widget>, Widget, WidgetRootState>{
    public async doWork(widget: Partial<Widget>, extra: { api: API; }, getState: () => any): Promise<Widget> {
        const newWidget = await fetch('/api/widgets', {
            body: JSON.stringify(widget),
            headers: {
                "content-type": 'application/json'
            },
            method: "POST"
        }).then(r => r.json());
        return newWidget;
    }

    protected reduceSuccess(moduleState: WidgetRootState, action: AnyAction): WidgetRootState {
        const {
            list: { data: listData = [], ...restList } = {},
            create: { data: widget = [], ...restCreate } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);
        const data = listData.slice(0);
        data.push(action.payload);
        const newState = { ...restState, list: { ...restList, data }, create: { ...restCreate } }
        return newState as WidgetRootState;
    }

    constructor() {
        super({namespace:"widgets", actionName:"create"});
    }
}

const createRequest = new CreateWidget();
const listRequest = new FetchWidgets();


const widgets: Widget[] = [
    { id: 0, title: "Widget 0" },
    { id: 1, title: "Widget 1" },
    { id: 2, title: 'Widget 2' }
]

const createdWidget: Widget = {
    id: 7,
    title: 'Widget #7'
}

const actions = {
    listBegin: { type: listRequest.actionNames.begin },
    listFail: { type: listRequest.actionNames.fail, payload: 'Some error occured' },
    listSuccess: { type: listRequest.actionNames.success, payload: widgets },
    createBegin: { type: createRequest.actionNames.begin },
    createFail: { type: createRequest.actionNames.fail, payload: 'Some error occured' },
    createSuccess: { type: createRequest.actionNames.success, payload: createdWidget }
}

describe('RequestAction.actionCreator', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create request and success when fetching succeeds', (done) => {
        fetchMock.getOnce('/api/widgets', { body: widgets, headers: { 'content-type': 'application/json' } });

        const expectedActions = [
            { type: listRequest.actionNames.begin },
            { type: listRequest.actionNames.success, payload: widgets }
        ]

        expect(listRequest.actionCreator()).toDispatchActions(expectedActions, done);
    });

    it('should create request and failure actions when fetching fails', (done) => {
        const errorMessage = 'Could not retrieve widgets';
        fetchMock.getOnce('/api/widgets', {
            throws: errorMessage,
            headers: { 'content-type': 'application/json' },
            status: '401',
            statusText: 'Unauthorized'
        });

        const expectedActions = [
            { type: listRequest.actionNames.begin },
            { type: listRequest.actionNames.fail, payload: errorMessage }
        ];

        expect(listRequest.actionCreator()).toDispatchActions(expectedActions, done);
    });
});

describe('RequestAction Reducers', () => {
    it('Standard RequestAction.reducer Should return initial state', () => {
        expect(listRequest.reducer({}, { type: 'SOME_ACTION' })).toEqual({});
    });

    it('Standard RequestAction.reducer Should handle BEGIN', () => {
        expect(listRequest.reducer({}, actions.listBegin)).toEqual({ list: { isBusy: true } });
    });

    it('Standard RequestAction.reducer Should handle FAIL', () => {
        expect(listRequest.reducer({}, actions.listFail)).toEqual({ list: { isBusy: false, error: actions.listFail.payload } });
    });

    it('Standard RequestAction.reducer Should handle SUCCESS', () => {
        expect(listRequest.reducer({}, actions.listSuccess)).toEqual({ list: { isBusy: false, data: actions.listSuccess.payload } });
    });

    it('Custom RequestAction.reducer Should return initial state', () => {
        expect(createRequest.reducer({}, { type: 'SOME_ACTION' })).toEqual({});
    });

    it('Custom RequestAction.reducer Should handle BEGIN', () => {
        expect(createRequest.reducer({}, actions.createBegin)).toEqual({ create: { isBusy: true } });
    });

    it('Custom RequestAction.reducer Should handle FAIL', () => {
        expect(createRequest.reducer({}, actions.createFail)).toEqual({ create: { isBusy: false, error: actions.createFail.payload } });
    });

    it('Custom RequestAction.reducer Should handle SUCCESS', () => {
        expect(createRequest.reducer({}, actions.createSuccess)).toEqual(
            {
                create: {
                    isBusy: false
                },
                list: {
                    data: [actions.createSuccess.payload]
                }
            });
    });
});

describe('Nested RequestAction Reducers', () => {
    interface TestRootState {
        auth: { user: string };
        something: { other: string; shouldChange: boolean; };
        widgets?: WidgetRootState
    }
    let initialState: TestRootState;
    const listReducer = listRequest.reducer;
    const createReducer = createRequest.reducer;

    function getRootReducer(nestedReducers: Reducer<WidgetRootState>[]) {
        let nestedReducer = new NestedReducer(nestedReducers);
        return combineReducers({
            widgets: nestedReducer.reducer,
            auth: (state, action) => state || {},
            something: (state, action) => state || {}
        });
    }

    beforeEach(() => {
        initialState = {
            auth: {
                user: 'Billy Joe'
            },
            something: {
                other: 'state',
                shouldChange: false
            },
            widgets: {
                infos: {
                    message: 'hello widgets'
                }
            }
        }
    });

    it('Standard nested RequestAction.reducer should handle begin', () => {
        let nestedReducers = [listReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            list: {
                isBusy: true
            }
        };
        expect(rootReducer(initialState, actions.listBegin)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Standard nested RequestAction.reducer should handle failure', () => {
        let nestedReducers = [listReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            list: {
                isBusy: false,
                error: actions.listFail.payload
            }
        };
        expect(rootReducer(initialState, actions.listFail)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Standard nested RequestAction.reducer should handle Success', () => {
        let nestedReducers = [listReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            list: {
                isBusy: false,
                data: actions.listSuccess.payload
            }
        };
        expect(rootReducer(initialState, actions.listSuccess)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Custom nested RequestAction.reducer should handle begin', () => {
        let nestedReducers = [createReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            create: {
                isBusy: true
            }
        };
        expect(rootReducer(initialState, actions.createBegin)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Custom nested RequestAction.reducer should handle failure', () => {
        let nestedReducers = [createReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            create: {
                isBusy: false,
                error: actions.listFail.payload
            }
        };
        expect(rootReducer(initialState, actions.createFail)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Custom nested RequestAction.reducer should handle success', () => {
        let nestedReducers = [createReducer];
        let rootReducer = getRootReducer(nestedReducers);
        const currentState = {
            create: {
                isBusy: false
            },
            list: {
                data: [actions.createSuccess.payload]
            }

        };
        expect(rootReducer(initialState, actions.createSuccess)).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...currentState
                }
            }
        );
    });

    it('Multiple nested reducers should handle begin', () => {
        let nestedReducers = [createReducer, listReducer];
        let rootReducer = getRootReducer(nestedReducers);

        let state: any = initialState;
        // First, begin create action
        let expectedWidgetState: any = {
            create: {
                isBusy: true
            }
        };
        state = rootReducer(state, actions.createBegin);
        expect(state).toEqual({
            ...initialState,
            widgets: {
                ...initialState.widgets,
                ...expectedWidgetState
            }
        });

        // Second, Begin list action
        expectedWidgetState = {
            ...expectedWidgetState,
            list: {
                isBusy: true
            }
        };
        state = rootReducer(state, actions.listBegin);
        expect(state).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...expectedWidgetState
                }
            }
        );
    });

    it('Multiple nested reducers should handle fail', () => {
        let nestedReducers = [createReducer, listReducer];
        let rootReducer = getRootReducer(nestedReducers);

        let state: any = initialState;

        // First, List Fail action
        let expectedWidgetState: any = {
            list: {
                isBusy: false,
                error: actions.listFail.payload
            }
        };
        state = rootReducer(state, actions.listFail);
        expect(state).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...expectedWidgetState
                }
            }
        );

        // First, create Fail action
        expectedWidgetState = {
            ...expectedWidgetState,
            create: {
                isBusy: false,
                error: actions.createFail.payload
            }
        };
        state = rootReducer(state, actions.createFail);
        expect(state).toEqual({
            ...initialState,
            widgets: {
                ...initialState.widgets,
                ...expectedWidgetState
            }
        });
    });

    it('Multiple nested reducers should handle success', () => {
        let nestedReducers = [createReducer, listReducer];
        let rootReducer = getRootReducer(nestedReducers);

        let state: any = initialState;

        // First, List Success action
        let expectedWidgetState: any = {
            list: {
                isBusy: false,
                data: actions.listSuccess.payload
            }
        };
        state = rootReducer(state, actions.listSuccess);
        expect(state).toEqual(
            {
                ...initialState,
                widgets: {
                    ...initialState.widgets,
                    ...expectedWidgetState
                }
            }
        );

        // First, create Success action
        expectedWidgetState = {
            ...expectedWidgetState,
            create: {
                isBusy: false
            },
            list: {
                isBusy: false,
                data: actions.listSuccess.payload.concat(actions.createSuccess.payload)
            }
        };
        state = rootReducer(state, actions.createSuccess);
        expect(state).toEqual({
            ...initialState,
            widgets: {
                ...initialState.widgets,
                ...expectedWidgetState
            }
        });

    });

})

describe('RequestAction.selectors', () => {

    it('getIsBusy should select loading state', () => {
        expect(listRequest.getIsBusy({
            widgets: {
                list:
                {
                    isBusy: false,
                    data: []
                }
            }
        })).toEqual(false);

        expect(listRequest.getIsBusy({
            widgets: {
                list:
                {
                    isBusy: true,
                    data: []
                }
            }
        })).toEqual(true);
    })

    it('getData should select data', () => {
        expect(listRequest.getData({
            widgets: {
                list:
                {
                    isBusy: false,
                    data: widgets
                }
            }
        })).toEqual(widgets);
    });

    it('getData should return empty object {} if data is undefined', () => {
        expect(listRequest.getData({})).toEqual({});
    });

    it('getError should select error', () => {
        const errorMsg = 'Some Error message';
        expect(listRequest.getError({
            widgets: {
                list:
                {
                    error: errorMsg,
                    isBusy: false,
                    data: []
                }
            }
        })).toEqual(errorMsg);
    });

    it('getError should return empty object if there is no root state', () => {
        expect(listRequest.getError({})).toEqual(undefined);
    });
});


describe('RequestAction.selectors should work with function pointers', () => {

    let selectors = {
        getIsBusy: listRequest.getIsBusy,
        getError: listRequest.getError,
        getData: listRequest.getData
    }

    it('getIsBusy should select loading state', () => {
        expect(selectors.getIsBusy({
            widgets: {
                list:
                {
                    isBusy: false,
                    data: []
                }
            }
        })).toEqual(false);

        expect(selectors.getIsBusy({
            widgets: {
                list:
                {
                    isBusy: true,
                    data: []
                }
            }
        })).toEqual(true);
    })

    it('getData should select data', () => {
        expect(selectors.getData({
            widgets: {
                list:
                {
                    isBusy: false,
                    data: widgets
                }
            }
        })).toEqual(widgets);
    });

    it('getData should return empty object if data is undefined', () => {
        expect(selectors.getData({})).toEqual({});
    });

    it('getError should select error', () => {
        const errorMsg = 'Some Error message';
        expect(selectors.getError({
            widgets: {
                list:
                {
                    error: errorMsg,
                    isBusy: false,
                    data: []
                }
            }
        })).toEqual(errorMsg);
    });

    it('getError should return undefined if there is no root state', () => {
        expect(selectors.getError({})).toEqual(undefined);
    });
});