const { ApolloServer } = require('apollo-server-cloud-functions'),
    { https } = require('firebase-functions'),
    schema = require('./graphql/schema'),
    functions = require('./graphql/functions')

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        comments: functions.getComments
    },
    Mutation: {
        comment: functions.postComment
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
            origin: `*`,
            credentials: true
        }
    }

exports.graphql = https.onRequest(server.createHandler(conf));
