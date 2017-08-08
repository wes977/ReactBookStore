"use strict"
// This is for adding an Item to the cart and all  that fun stuff 
export function addToCart(book){
	return { type:"ADD_TO_CART",
			payload: book}
}

// This is for deleteing an Item from our cart Whoo
export function deleteCartItem(cart){
	return { type:"DELETE_CART_ITEM",
			payload: cart}
}

// This is for deleteing an Item from our cart Whoo
export function updateCartItem(_id, unit){
	return { type:"UPDATE_CART_ITEM",
			_id: _id,
			unit: unit
		   }
}

