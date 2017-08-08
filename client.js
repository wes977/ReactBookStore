"Use strict"

// React Stuff
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// REact Router 
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postBooks, deleteBook, updateBook} from './actions/booksActions';
// Step 1 create the store
const middleware = applyMiddleware (thunk, logger);
const store = createStore(reducers,middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main'
const Routes = (
<Provider store={store}>
	<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList} />
				<Route path="/admin" component={BookForm} />
				<Route path="/cart" component={Cart} />
	</Route>
	</Router>
</Provider>
)
render(
Routes, document.getElementById('app')
);

// CART ACTIONS
//store.dispatch(addToCart([{id: 1}]))
