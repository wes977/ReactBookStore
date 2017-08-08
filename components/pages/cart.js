"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCartItem} from '../../actions/cartActions';

class Cart extends React.Component{

	onDelete(_id){

		// create a copy of the current array of books
		const currentCartItemsToDelete = this.props.cart;
		//determine at whihc index in books array is the books to be deleted
		const indexToDelete = currentCartItemsToDelete.findIndex(
			function(cart){
				return cart._id == _id;
			}
		)
		// using slice to remove the book and all that from the cart Whoo hoo
		let cartAfterDelete = [...currentCartItemsToDelete.slice(0, indexToDelete),
							   ...currentCartItemsToDelete.slice(indexToDelete + 1)]
		// Passing the cart with the removed value be gone 
		this.props.deleteCartItem(cartAfterDelete);

	}
	onIncrement(_id){
		this.props.updateCartItem(_id, 1);
	}
	onDecrement(_id, quantity){
		if(quantity > 1){
			this.props.updateCartItem(_id, -1);

		} else {
			this.onDelete(_id);
		}
	}
	
constructor(){
super();
this.state = {
showModal:false
}
}
open(){
this.setState({showModal:true})
}
close(){
this.setState({showModal:false})
}
	render(){
		if(this.props.cart[0]){         // If the cart got anything in it and all that render a cart
			return this.renderCart();
		} else {                      // If the the cart got nothing render an empty div home slice
			return this.renderEmpty();
		}

	}
	// The cart empty so lets render an empty div homeslice!
	renderEmpty(){
		return(<div></div>)
			   }
			   // Would you look at that the cart is not empty we best render something
			   renderCart(){
			const cartItemsList = this.props.cart.map(function(cartArr){
				return(				
					<Panel key={cartArr._id}>
					<Row>
					<Col xs={12} sm={2}>
					<h6>{cartArr.title}</h6><span>    </span>
					</Col>
					<Col xs={12} sm={2}>
					<h6>usd. {cartArr.price}</h6><span>    </span>
					</Col>
					<Col xs={12} sm={2}>
					<h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6><span>    </span>
					</Col>
					<Col xs={6} sm={4}>
					<ButtonGroup style={{minWidth:'300px'}}>
					<Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
													  <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
		<span>     </span>
		<Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
		</ButtonGroup>
		</Col>
		</Row>
		</Panel>
		)
	}, this)
	return(
		<Panel header="Cart" bsStyle="primary">
		{cartItemsList}
		<Row>
		<Col xs={12}>
		<h6>Totla amount: ${this.props.totalAmount}</h6>
<Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
			PROCEED TO CHECKOUT
			</Button>
</Col>
</Row>
		<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <h6>Your order has been saved</h6>
          </Modal.Body>
          <Modal.Footer>
			   <Col xs={6}>Total $${this.props.totalAmount}</Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
</Panel>

)
}
}
//Making all the things accessable and all that Jazz Yee!
function mapStateToProps(state){
	return{
		cart:state.cart.cart,
		totalAmount: state.cart.totalAmount
	}

}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem:deleteCartItem,
		updateCartItem:updateCartItem
	},dispatch )
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
