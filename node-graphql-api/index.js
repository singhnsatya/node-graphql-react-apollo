const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true });
mongoose.connection.on('open', () => console.log('Mongodb connected'));
mongoose.connection.on('error', (e) => console.log('Mongodb connection failed', e));

app.use('/graphql', graphqlHttp({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Running on 4000');
});
