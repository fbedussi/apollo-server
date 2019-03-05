const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        me: User
        user(id: ID!): User
        users: [User!]
        messages: [Message!]!
        message(id: ID!): Message!
    }

    type Mutation {
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
        editMessage(message: UpdatedMessage!): Boolean!
    }

    type User {
        id: ID!
        "this is the name"
        name: String!
        age: Int
        messages: [Message!]!
    }

    input UpdatedMessage {
        id: ID!
        text: String!
    }

    type Message {
        id: ID!
        text: String!
        user: User!
    }
`;

module.exports = schema;
