"Use strict"

// React Stuff
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';


import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postBooks, deleteBook, updateBook} from './actions/booksActions';
// Step 1 create the store
const middleware = applyMiddleware (logger);
const store = createStore(reducers,middleware);

import BooksList from './components/pages/booksList';

render(
<Provider store={store}>
<BooksList />
</Provider>, document.getElementById('app')
);

// CART ACTIONS
//store.dispatch(addToCart([{id: 1}]))
