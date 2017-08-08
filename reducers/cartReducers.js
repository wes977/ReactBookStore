"use strict"

export function cartReducers (state={cart:[]},action)
{
	switch (action.type){
		case "ADD_TO_CART":
			return {
				...state, 
				cart:[...action.payload], 
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
			break;
		case "DELETE_CART_ITEM":
			return {
				...state,
				cart:action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
			break;
		case "UPDATE_CART_ITEM":
			// CREATe a copy of the current array
			const currentCartItemToUpdate = [...state.cart]
			//determine at whihc index in boks is the book to be deleted
			const indexToUpdate = currentCartItemToUpdate.findIndex(
				function(book){
					return book._id === action._id;
				}
			)
			// create a new book object with the new values and with the same array index of the item we want to replace.
			// To acheien this we will use .. spread but we could use concat methos too
			const newItemToUpdate = {
				...currentCartItemToUpdate[indexToUpdate],
				quantity: currentCartItemToUpdate[indexToUpdate].quantity + action.unit
			}

			//use slice to remove the book at the specified index replace with the new object and concatenate
			// with the rest of items in the array
			let cartUpdate =  [...currentCartItemToUpdate.slice(0,indexToUpdate),
							   newItemToUpdate,...currentCartItemToUpdate.slice(indexToUpdate + 1)]
			return {
				...state,
				cart: cartUpdate,
				totalAmount: totals(cartUpdate).amount,
				totalQty: totals(cartUpdate).qty
			}
			break;
					   }
	return state
}



export function totals(payloadArr){

	// This function Gets you the total value in your cart homeslice Whoo!
	const totalAmount = payloadArr.map(function(cartArr){
		return cartArr.price * cartArr.quantity; 		// multiplying all the quantitys by the value 
	}).reduce(function(a,b) { 							// going through all the values in the array 
		return a + b;									// Adding all the values in the array 
	}, 0);												// Starting the array at index 0 

	// This function gets the total quantity of the cart like you got 10 books in your cart Home slice!
	const totalQty = payloadArr.map(function(qty){
		return qty.quantity;							// getting the quantity and all that 
	}).reduce(function(a,b){							// using the reduce function to cycle through all the items 
		return a + b;									// adding all the quantitys 
	},0); 												// Starting at index Zero


	return {amount:totalAmount.toFixed(2), qty:totalQty}
}
