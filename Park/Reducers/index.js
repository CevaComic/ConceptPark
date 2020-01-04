import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import middlewares from './middlewares'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
    whitelist: ['parking'],
}

const middleware = applyMiddleware(...middlewares,sagaMiddleware)
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer,compose(middleware))
const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export {
	store,
	persistor
}
