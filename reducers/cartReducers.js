"use strict"

export function cartReducers (state={cart:[]},action)
{
	switch (action.type){
		case "ADD_TO_CART":
			return {cart:[...state, ...action.payload]}
			break;
		case "DELETE_CART_ITEM":
			return {...state,cart:action.payload}
			break;
					   }
	return state
}
