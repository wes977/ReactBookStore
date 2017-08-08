"use strict"
import axios from 'axios';
// Get Books
export function getBooks(book){
	return function(dispatch){
		axios.get("/api/books").
		then(function(response){
			dispatch({type:"GET_BOOK",payload:response.data})
		})
			.catch(function(err){
			dispatch({type:"GET_BOOKS_REJECTED", payload:err})
		})
	}
}

//TODO: This is a test

// post books
export function postBooks(book){
	// Functions because I am using reactThunk
	return function(dispatch){
		// Sending the book in a post method and all that 
		axios.post("/api/books",book).then(function(response){
			dispatch({type:"POST_BOOK",payload:response.data}) // Actually dispatching the action and all that 
		})
		// If something goes wrong and the book does not get added and all that then you get this action 
			.catch(function(err){
			dispatch({type:"POST_BOOK_REJECTED", payload: "There was an error! posting the book and all that "})
		})
	}
}


// DELETE BOOK
// Takes in an ID for the book you wish to delete
// send the api to /api/books/ the id of the book
// 
export function deleteBook(id){
	return function(dispatch){
		axios.delete("/api/books/" + id)
			.then(function(response){
			dispatch({type:"DELETE_BOOK",
					  payload:id})
		})
			.catch(function(err){
			dispatch({type:"DELETE_BOOK_REJECTED",
					  payload:err})
		})
	}
}

// Update book
export function updateBook(book){
	return{
		type: "UPDATE_BOOK",
		payload: book
	}
}
