const express = require('express');
const {ApolloServer,} = require('apollo-server-express');
const cors = require('cors');

const schema = require("./schema");
const models = require("./models");
const resolvers = require('./resolvers');

const app = express();

app.use(cors());

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        models,
        me: models.users[0],
    },
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => {
    console.log('Apollo server on http://localhost:8000/graphql');
});
