import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Bookshelf from './Bookshelf'
import { Routes, Route } from 'react-router-dom'

const LOWERCASE_SEARCH_TERMS = [ 'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 
    'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 
    'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 
    'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 
    'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 
    'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
    'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 
    'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 
    'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 
    'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 
    'Virtual Reality', 'Web Development', 'iOS'].map(term => term.toLowerCase());

class BooksApp extends React.Component {
  state = {
    ownBooks: [],
    searchBooks: [],
  }

  //Invoke own books after DOM is mounted
  componentDidMount = () => {
    this.getBookshelf();
  }

  //Getting all owned books from API
  getBookshelf = () => {
    BooksAPI.getAll().then(res => {
      this.setState({
        ownBooks: res
      })
    })
  }

  //Search book from API by input value
  search = (value) => {
    if (!LOWERCASE_SEARCH_TERMS.includes(value.toLowerCase())) {
      this.setState({searchBooks: []})
    }

    if (value !== '') {
      BooksAPI.search(value).then(res => {
        this.setState({
          searchBooks: res.map(searchBook => {
            const book = this.state.ownBooks.find(ownBook => ownBook.id === searchBook.id)
            if (book) {
              searchBook.shelf = book.shelf
              return searchBook
            }
            return searchBook
          })
        })
      }) 
    }
  }

  //Update to API and client
  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      book.shelf = shelf;
    })
    
    this.setState({
      ownBooks: this.state.ownBooks.map(ownBook => {
        if (ownBook.id === book.id) {
          ownBook.shelf = shelf
        }
        return ownBook
      }),
      searchBooks: this.state.searchBooks.map(searchBook => {
        if (searchBook.id === book.id) {
          searchBook.shelf = shelf
        }
        return searchBook
      })
    })
    this.setState({ownBooks: [...this.state.ownBooks, book]})
  }

  //Selecting a shelf for a book
  onSelect = (value) => {
    this.update(value.book, value.selection)
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Bookshelf books={this.state.ownBooks} select={this.onSelect} />} />
          <Route path="/search" element={<Search query={this.search} books={this.state.searchBooks} select={this.onSelect} />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
