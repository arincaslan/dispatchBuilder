import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import nodesReducer from './store/reducers/nodes';
import pathsReducer from './store/reducers/paths';
import userReducer from "./store/reducers/user";
import trucksReducer from "./store/reducers/trucks";
import { BrowserRouter } from 'react-router-dom';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  nodesReducer: nodesReducer,
  pathsReducer: pathsReducer,
  userReducer: userReducer,
  trucksReducer: trucksReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(routerMiddleware(history), thunk)
));

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>

      <App />

    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
