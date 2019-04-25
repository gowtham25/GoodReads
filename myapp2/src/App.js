import React, { Component } from 'react';
import BookList from './bookList.js';
import Pagination from "react-js-pagination";
import './App.css';
var convert = require('xml-js');

class App extends Component {
	constructor(){
		super()
		this.state = {
			bookList:[],
			activePage: 1,
			totalResult: 0,
			nextPagination:true, // prevent fast pagination
			runAPICall:false
		}
	}
	searchBook = (page) => {
		let searchString = document.getElementById('searchByTitle').value;
		if(searchString !== ""){
			this.setState({activePage: page, runAPICall:true});
			let proxyurl1 = "https://cors-anywhere.herokuapp.com/",
				proxyUrl = `https://www.goodreads.com/search/index.xml?key=zLYQreFCS11ZUypD1QGhCA&q=${searchString}&page=${page}`,
				dataAsJson = {};
			fetch(proxyurl1 + proxyUrl)
			.then(response => response.text())
			.then(str => {
				dataAsJson = JSON.parse(convert.xml2json(str, {compact: true, spaces: 4}));
			}).then(() => {
				this.setState({
					bookList: dataAsJson.GoodreadsResponse.search.results.work,
					totalResult: parseInt(dataAsJson.GoodreadsResponse.search['total-results']._text),
					nextPagination: true,
					runAPICall: false
				})
			});
		}else{
			alert("Please enter some thing to Search!");
		}
	}
	handlePageChange = (pageNumber) => {
		if(pageNumber !== this.state.activePage){  // prevent from the same page pagination again and again
			if(!this.state.nextPagination){
				return false;
			}
			this.setState({
				nextPagination: false
			})
			this.searchBook(pageNumber);
		}
	}
	render() {
		return (
			<div className="App">
				<div className="search-container">
					<label>Search By Title : </label>
					<input type="text" id="searchByTitle"/> 
					<button onClick={() => this.searchBook(1)} className="search">Search</button>
				</div>
				<table>
					<thead>
						<tr>
							<th>Book Cover</th>
							<th>Author</th>
							<th>Title</th>
							<th>Rating</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.bookList.map((element, index) => {
								return <BookList bookData={element} key={index}/>
							})
						}
					</tbody>
				</table>
				{
					this.state.bookList.length === 0 ? 
						<span className="no-result">No Result to show</span> : 
						this.state.runAPICall ? 
							<span className='wait'>Loading... Please Wait.....</span> :
							<Pagination
								activePage={this.state.activePage}
								itemsCountPerPage={20}
								totalItemsCount={this.state.totalResult}
								pageRangeDisplayed={8}
								onChange={this.handlePageChange}
							/>
				}
			</div>
		);
	}
}

export default App;
