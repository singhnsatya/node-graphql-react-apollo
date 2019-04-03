import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    authors {
      name
      age
      authorId
    }
  }
`

class AddBook extends Component {
  displayBooks = () => {
    let data = this.props.data;
    if(data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.bookId}>{book.name}</li>
      })
    }
  }
  render() {
    return (
      <div>
      <ul id="book-list">
      {this.displayBooks()}
      </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(AddBook);
