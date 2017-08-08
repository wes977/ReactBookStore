// Wesley Thompson 
// Aug 04 2017 
// this is the books form where we can create and delete new book and all that fun stuff 

"use strict"

// Imports 
import React from 'react';
import {Row, Col, Well,Panel,FormControl,ControlLabel,FormGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBook} from '../../actions/booksActions';

// The class for the books form 
class BookForm extends React.Component{  

	// Handle Submit 
	// This is where you can create a new book and all that fun stuff
	// Takes all the refs from the form and uses all that mumbo jumbo to create a book 
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

	// On Delete 
	// Deletes the selecet book from the drop down in delete books 
	onDelete(){
		let bookId = findDOMNode(this.refs.delete).value; // This is getting the delete value from the ref 
		this.props.deleteBook(bookId); // this is using the other call to actually delete our book 
	}

	// This is the main render for the books form and all that 
	// displays  the add a book and the delete 
	// Add sa book First panel 
	// delete a book second panel 
	render(){
		// this is where we create the list of book IDS to delete a specific book and all that fun stuff!
		const booksList = this.props.books.map(function(booksArr){
			return (
				<option key={booksArr._id}>{booksArr._id}</option>
			)
		})
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
<Panel style={{marginTop:'25px'}}>
	<FormGroup controlId="formControlsSelect">
		<ControlLabel>Select a id book to Delete</ControlLabel>
<FormControl ref="delete" componentClass="select" placeholder="select">
	<option value="select">select</option>
{booksList}
</FormControl>
</FormGroup>
<Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Book</Button>
</Panel>
</Well>
)

}
}
// Attempted comments for the HTML stuff
//<!-- This is the form control to add a title the ref tag lets us acall it later -->
//<!-- This is the submit button it calls the handler and all that and binds the refs-->

//map Store To Props 
// this is where we manage some of the state and all that 
function mapStateToProps(state) {
	return {
		books: state.books.books // Putting the books in the state
	}
}

// map Dispatch to Props 
// This function maps the dispatch the props so basically we can update the props with a new book or what ever
function mapDispatchToProps(dispatch){
	return bindActionCreators({postBooks,deleteBook},dispatch)// This is alowing us to post books to props and al that 
}

//This is where we send all that stuff we have done 
export default connect(mapStateToProps, mapDispatchToProps)(BookForm); // null as we are not mapping the state
