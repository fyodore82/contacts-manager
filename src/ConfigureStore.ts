import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { ApplicationState, reducers, rootSaga } from './store';

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	let mw = applyMiddleware(sagaMiddleware);

	const allReducers = combineReducers<ApplicationState>({ ...reducers });
	let store = createStore(allReducers, mw);
	sagaMiddleware.run(rootSaga);

	return store;
}