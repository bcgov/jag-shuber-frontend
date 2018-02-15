import { registerMiddlewares } from 'redux-actions-assertions';
import thunk from 'redux-thunk';
import RequestAction, { RequestActionState } from "../RequestAction";
import * as fetchMock from 'fetch-mock';
import { API } from '../../api';

registerMiddlewares([thunk]);

interface Widget {
    id: number;
    title: string;
}

interface RootState {
    widgets?: {
        list: RequestActionState<Widget[]>
    }
}

class FetchWidgets extends RequestAction<{}, Widget[], RootState>{
    public async doWork(request: {}, extra: { api: API; }, getState: () => any): Promise<Widget[]> {
        const res = await fetch('/api/widgets');
        const body = await res.json() as Widget[];
        return body;
    }
    constructor() {
        super("widgets", "list");
    }

}

let requestAction = new FetchWidgets();

const widgets: Widget[] = [
    { id: 0, title: "Widget 0" },
    { id: 1, title: "Widget 1" },
    { id: 2, title: "Widget 2" }
]

const actions = {
    begin: { type: requestAction.actionNames.begin },
    fail: { type: requestAction.actionNames.fail, payload: "Some error occured" },
    success: { type: requestAction.actionNames.success, payload: widgets },
}

describe('RequestAction.actionCreator', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create request and success when fetching succeeds', (done) => {
        fetchMock.getOnce('/api/widgets', { body: widgets, headers: { 'content-type': 'application/json' } })

        const expectedActions = [
            { type: requestAction.actionNames.begin },
            { type: requestAction.actionNames.success, payload: widgets }
        ]

        expect(requestAction.actionCreator()).toDispatchActions(expectedActions, done);
    });

    it('should create request and failure actions when fetching fails', (done) => {
        const errorMessage = "Could not retrieve widgets";
        fetchMock.getOnce('/api/widgets', {
            throws: errorMessage,
            headers: { 'content-type': 'application/json' },
            status: "401",
            statusText: "Unauthorized"
        });

        const expectedActions = [
            { type: requestAction.actionNames.begin },
            { type: requestAction.actionNames.fail, payload: errorMessage }
        ]

        expect(requestAction.actionCreator()).toDispatchActions(expectedActions, done);
    })
})


describe('RequestAction.reducer', () => {

    it('Should return initial state', () => {
        expect(requestAction.reducer(undefined, { type: "SOME_ACTION" })).toEqual(undefined);
    });

    it('Should handle BEGIN', () => {
        expect(requestAction.reducer(undefined, actions.begin)).toEqual({ isBusy: true });
    });

    it('Should handle FAIL', () => {
        expect(requestAction.reducer(undefined, actions.fail)).toEqual({ isBusy: false, error: actions.fail.payload });
    });

    it('Should handle SUCCESS', () => {
        expect(requestAction.reducer(undefined, actions.success)).toEqual({ isBusy: false, data: actions.success.payload });
    });
})

describe('RequestAction.reducer as nested reducer', () => {
    interface TestRootState {
        auth: { user: string };
        something: { other: string; shouldChange: boolean; };
        widgets: {
            infos?: { message: string }
            list?: RequestActionState<Widget[]>
        }
    }

    const initialState: TestRootState = {
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

    const rootReducer = (state = initialState, action: any) => {
        let newState: TestRootState = { ...state, widgets: { list: requestAction.reducer(state.widgets.list, action) } }
        return newState;
    }

    it('should handle success', () => {
        expect(rootReducer(undefined, actions.begin)).toEqual(
            Object.assign({}, initialState, {
                widgets: {
                    list: {
                        isBusy: true
                    }
                }
            }));
    });

    it('should handle failure', () => {
        expect(rootReducer(undefined, actions.fail)).toEqual(
            Object.assign({}, initialState, {
                widgets: {
                    list: {
                        isBusy: false,
                        error: actions.fail.payload
                    }
                }
            }));
    });

    it('should handle Success', () => {
        expect(rootReducer(undefined, actions.success)).toEqual(
            Object.assign({}, initialState, {
                widgets: {
                    list: {
                        isBusy: false,
                        data: actions.success.payload
                    }
                }
            }));
    });
})

describe('RequestAction.selectors', () => {

    it('getIsBusy should select loading state', () => {
        expect(requestAction.getIsBusy({
            widgets: {
                list:
                    {
                        isBusy: false,
                        data: []
                    }
            }
        })).toEqual(false);

        expect(requestAction.getIsBusy({
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
        expect(requestAction.getData({
            widgets: {
                list:
                    {
                        isBusy: false,
                        data: widgets
                    }
            }
        })).toEqual(widgets);
    });

    it('getData should return undefined if data is undefined', () => {
        expect(requestAction.getData({})).toEqual(undefined);
    });

    it('getError should select error', () => {
        const errorMsg = "Some Error message";
        expect(requestAction.getError({
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
        expect(requestAction.getError({})).toEqual(undefined);
    });
});