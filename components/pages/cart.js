"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem} from '../../actions/cartActions';

class Cart extends React.Component{
	
	onDelete(_id){
		
		   // create a copy of the current array of books
      const currentCartItemsToDelete = this.props.cart;
	  console.log("This is the props cart" + _id);
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
					<Button bsStyle="default" bsSize="small">-</Button>
					<Button bsStyle="default" bsSize="small">+</Button>
					<span>     </span>
					<Button onClick={this.onDelete.bind(this, cartArr._id)}bsStyle="danger" bsSize="small">DELETE</Button>
					</ButtonGroup>
					</Col>
					</Row>
					</Panel>
				)
			}, this)
			return(
				<Panel header="Cart" bsStyle="primary">
				{cartItemsList}
				</Panel>

			)
		}
	}

	function mapStateToProps(state){
		return{
			cart:state.cart.cart
		}

	}
	function mapDispatchToProps(dispatch){
		return bindActionCreators({
			deleteCartItem:deleteCartItem
		},dispatch )
	}

	export default connect(mapStateToProps,mapDispatchToProps)(Cart);
