import { createStore } from 'redux';
import { reducers } from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export default store;
