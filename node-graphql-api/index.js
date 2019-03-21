const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHttp({
	schema,
	graphiql: true
}));

app.listen(3000, () => {
	console.log('Running on 3000');
});
