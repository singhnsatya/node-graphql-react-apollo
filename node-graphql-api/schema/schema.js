const graphql = require('graphql');

const { GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql;

// mock data
var books = [
	{name: 'Think and Grow Rich', genre: 'Non-Fictional', id: '1'},
	{name: '50 Shades of Gray', genre: 'Fantasy', id: '2'},
	{name: 'Altered Carbon', genre: 'Sci-Fi', id: '3'}
]

var authors = [
	{name: 'Napoleon Hill', age: 80, id: '1'},
	{name: 'Robert Kyosaki', age: 70, id: '2'},
	{name: 'Test', genre: 62, id: '3'}
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// code to get data from db / other resource
				return books.find(i => i.id === args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return authors.find(i => i.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
