import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from '../config/fbConfig';
// const store = createStore(reducers, composeWithDevTools());
// const store = createStore(reducers, applyMiddleware(thunk));
const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		// other store enhancers if any
		reduxFirestore(fbConfig)
		// reactReduxFirebase()
	)
);
export type RootState = ReturnType<typeof store.getState>;
export default store;
