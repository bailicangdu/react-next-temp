import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducer';

const reducer = combineReducers(reducers);
// const logger = createLogger({ collapsed: true })

export default (initialState = {}) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))