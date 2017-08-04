
"use strict"

import {createStore} from 'redux';

// step 3 define reducers
export function booksReducers (state={books:[{
  _id: 1,
  title: 'American Gods',
  description: 'Pretty Good Book!',
  price: 9.99

},{
  _id: 2,
  title: 'Horton Hears a WHO',
  description: 'Got turned into a meh Movie.',
  price: 69.99
}]}, action)
{
  switch(action.type){
    case "GET_BOOK":
    return {
      ...state,books:[...state.books]}
    break;
    case "POST_BOOK":
    return {
      books:[...state.books,...action.payload]}
    break;
    case "DELETE_BOOK":
      // create a copy of the current array of books
      const currentBookToDelete = [...state.books]
      //determine at whihc index in books array is the books to be deleted
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
          return book._id == action.payload._id;
        }
      )
      // using slice to remove the book and all that
      return {books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)]}
      break;
      case "UPDATE_BOOK":
      // CREATe a copy of the current array
      const currentBookToUpdate = [...state.books]
      //determine at whihc index in boks is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book){
          return book._id === action.payload._id;
        }
      )
      // create a new book object with the new values and with the same array index of the item we want to replace.
      // To acheien this we will use .. spread but we could use concat methos too
      const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title:action.payload.title
      }
      //This lof has the purpose to show you how new book to update looks like
      console.log("What is it newBookToUpdate: ", newBookToUpdate);
      //use slice to remove the book at the specified index replace with the new object and concatenate
      // with the rest of items in the array
      return {books: [...currentBookToUpdate.slice(0,indexToUpdate),
      newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate + 1)]}
        break;
  }
  return state;
}
