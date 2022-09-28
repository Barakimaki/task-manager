import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'

import tasksReducer from "./reducers/tasksReducer";
import {loadState, saveState} from "./localStore/localStore";

const rootReducers = combineReducers({
    tasks: tasksReducer
})

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const persistedState = loadState();

let store = createStore(rootReducers, persistedState, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    saveState({
        tasks: store.getState().tasks
    });
});

export default store