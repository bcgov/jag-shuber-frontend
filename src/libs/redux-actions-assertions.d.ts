declare module 'redux-actions-assertions' {
    import {Middleware} from 'redux'
    export function registerMiddlewares(middlewares: Middleware[]): void;
    export function registerAssertions():void;
}

declare namespace jest {
    export interface Matchers<R> {
        toDispatchActions(args: any, done: () => void): R;
        toDispatchActionsWithState(state: any, actions: any, done: () => void): R;
        toNotDipatchActions(actions: any, done: () => void): R;
    }
}