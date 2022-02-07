import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

export default function Search(props) {
  const handleChange = (event) => {
    props.query(event.target.value)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="shelf"><button className="close-search">Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={handleChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {Array.isArray(props.books) && props.books.length > 0 ? props.books.map(book => 
          <Book 
            key={book.id}
            book={book}
            select={props.select}
          />) : ''} 
        </ol>
      </div>
    </div>
  )
}