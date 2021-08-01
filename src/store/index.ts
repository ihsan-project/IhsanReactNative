import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { initialState } from '../reducers';
import rootSaga from '../sagas';
import api from '../middleware/api';

const sagaMiddleware = createSagaMiddleware();

// Add to list of middlewares here
const middlewares = [api, sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
