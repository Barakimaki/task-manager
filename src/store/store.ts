import { applyMiddleware, createStore} from "redux"
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {rootReducer} from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: 'root',
    storage,
    blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, undefined, applyMiddleware(thunkMiddleware))

export const persistor = persistStore(store)