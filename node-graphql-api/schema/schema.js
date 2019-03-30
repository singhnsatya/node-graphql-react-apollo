const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const BookReview = require('../models/reviews/bookReview');
const uuidv4 = require('uuid/v4');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

// // mock data
// var books = [
// 	{name: 'Think and Grow Rich', genre: 'Non-Fictional', id: '1', authorId: '1'},
// 	{name: '50 Shades of Gray', genre: 'Fantasy', id: '2', authorId: '2'},
// 	{name: 'Altered Carbon', genre: 'Sci-Fi', id: '3', authorId: '3'},
// 	{name: 'Altered Carbon1', genre: 'Sci-Fi', id: '4', authorId: '3'},
// 	{name: 'Altered Carbon2', genre: 'Sci-Fi', id: '5', authorId: '3'}
// ]
//
// var authors = [
// 	{name: 'Napoleon Hill', age: 80, id: '1'},
// 	{name: 'Robert Kyosaki', age: 70, id: '2'},
// 	{name: 'Test', age: 62, id: '3'}
// ]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		bookId: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		_authorId: { type: GraphQLID },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findOne({authorId: parent._authorId});
			}
		},
		reviews: {
			type: new GraphQLList(BookReviewType),
			resolve(parent, args) {
				return BookReview.find({ _bookId: parent.bookId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		authorId: { type: GraphQLID },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ _authorId: parent.authorId });
			}
		}
	})
});

const BookReviewType = new GraphQLObjectType({
	name: 'BookReview',
	fields: () => ({
		id: { type: GraphQLID },
		text: { type: GraphQLString },
		reviewId: { type: GraphQLID },
		_bookId: { type: GraphQLID },
		book: {
			type: BookType,
			resolve(parent, args) {
				return Book.find({ bookId: parent._bookId });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.authorId);
			}
		},
		books: {
			type:  new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
				return Author.find({});
			}
		}
	}
});

// Mutations allows us to add/delete/upate data through graphql
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type:  new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				let { name, age } = args;
				let authorId = uuidv4();
				let author = new Author({
					authorId,
					name,
					age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				bookId: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				_authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let { name, genre, _authorId } = args;
				let bookId = uuidv4();
				let book = new Book({
					bookId,
					name,
					genre,
					_authorId
				});
				return book.save();
			}
		},
		addBookReview: {
			type: BookReviewType,
			args: {
				reviewId: { type: GraphQLID },
				text: { type: new GraphQLNonNull(GraphQLString) },
				_bookId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let { text, _bookId } = args;
				let reviewId = uuidv4();
				let newBookReview = new BookReview({
						reviewId,
						text,
						_bookId
				});
				return newBookReview.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
