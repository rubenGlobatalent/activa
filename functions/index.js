const { ApolloServer } = require('apollo-server-cloud-functions'),
    { https } = require('firebase-functions'),
    admin = require('firebase-admin'),
    schema = require('./graphql/schema'),
    resolversFunctions = require('./graphql/resolvers')

admin.initializeApp()

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        comments: resolversFunctions.getComments
    },
    Mutation: {
        PostComment: resolversFunctions.postComment,
        DeleteComment: resolversFunctions.deleteComment
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
