"use strict"
// Get Books
export function getBooks(book){
  return{
    type:"GET_BOOK"
  }
}


 // post books
 export function postBooks(book){
   return{
     type:"POST_BOOK",
     payload:book
   }
 }


// delete book
export function deleteBook(id)
{
  return {
    type:"DELETE_BOOK",
    payload: id
  }
}

// Update book
export function updateBook(book){
  return{
    type: "UPDATE_BOOK",
    payload: book
  }
}
