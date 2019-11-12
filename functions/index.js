const { ApolloServer } = require('apollo-server-cloud-functions'),
    { https } = require('firebase-functions'),
    admin = require('firebase-admin'),
    schema = require('./graphql/schema'),
    functions = require('./graphql/functions')

admin.initializeApp()

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        comments: functions.getComments
    },
    Mutation: {
        comments: functions.postComment,
        users: functions.postUser
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    playground: true,
    introspection: true,
}),
    conf = {
        cors: {
            origin: '*',
            credentials: true
        }
    }

exports.graphql = https.onRequest(server.createHandler(conf));
