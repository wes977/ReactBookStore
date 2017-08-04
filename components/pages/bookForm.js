import React from 'react';
import {Row, Col, Well,Panel,FormControl,ControlLabel,FormGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks} from '../../actions/booksActions';
class BookForm extends React.Component{
	handleSubmit(){
		const book=[{
			// This stuff gets all the data from the ref tags in the form and assigns it to a book object
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.discription).value,
			price: findDOMNode(this.refs.price).value
		}]
		// This calles the action to create a new book and adds our new books whoo
		this.props.postBooks(book);
	}
	render(){
		return(
			<Well>
			<Panel>
			<FormGroup controlId="title">
			<ControlLabel>Title</ControlLabel>
			<FormControl type="text" placeholder="Enter Title" ref="title" />
			<ControlLabel>Description</ControlLabel>
			<FormControl type="text" placeholder="Enter Description" ref="discription" />

			<ControlLabel>Title</ControlLabel>
			<FormControl type="text" placeholder="Enter Price" ref="price" />
			</FormGroup>

			<Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save Book</Button>
</Panel>
</Well>
)

}
}
// Attempted comments for the HTML stuff
//<!-- This is the form control to add a title the ref tag lets us acall it later -->
//<!-- This is the submit button it calls the handler and all that and binds the refs-->


// This function maps the dispatch the props so basically we can update the props with a new book or what ever
function mapDispatchToProps(dispatch){
	return bindActionCreators({postBooks},dispatch)// This is alowing us to post books to props and al that 
}

export default connect(null, mapDispatchToProps)(BookForm); // null as we are not mapping the state
