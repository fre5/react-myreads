import React from 'react'

export default function Book(props) {
  
  const handleChange = (event) => {
    const sendEventObj = { selection: event.target.value, book: props.book }
    props.select(sendEventObj)
  } 

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${props.book.imageLinks ? props.book.imageLinks.thumbnail : ''}")` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={props.book.shelf || 'none'} onChange={handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div> 
        <div className="book-authors">{props.book.authors ? props.book.authors.length > 1 ? props.book.authors.join(", ") : props.book.authors[0] : ''}</div>
      </div>
    </li>
  )
}