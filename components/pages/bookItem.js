"Use strict"

import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCartItem} from '../../actions/cartActions';


class BookItem extends React.Component{
	
	
	handleCart(){
		const book = [...this.props.cart, {
					  _id:this.props._id,
					  title:this.props.title,
					  description:this.props.description,
					  price:this.props.price,
			quantity:1
					  }]
		if(this.props.cart.length > 0){
			let _id = this.props._id;
			
			let cartIndex = this.props.cart.findIndex(function(cart){
				return cart._id === _id;
			})
			// IF returns -1 there are no ITEMS iwth the same ID 
			if (cartIndex === -1){
				this.props.addToCart(book) // if no other of the same Item in the cart then add the item 
			}else {
				// This is updating the item and all that fun stuff Whoo!
				this.props.updateCartItem(_id,1, this.props.cart);
			}
		}else {
			// IF CART IS EMPTY 
		this.props.addToCart(book)
		}
;
	}
	
  render(){
    return(
      <Well>
      <Row>
      <Col xs={12}>
      <h6>{this.props.title}</h6>
      <p>{this.props.description}</p>
      <h6>$ {this.props.price}</h6>
      <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
      </Col>
      </Row>
      </Well>
    )
  }
}

function mapStateToProps (state){
	return{
		cart:state.cart.cart
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart:addToCart,
		updateCartItem:updateCartItem
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
