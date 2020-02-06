"use strict";
const { ApolloServer } = require("apollo-server-cloud-functions");
const { https } = require("firebase-functions");
const admin = require("firebase-admin");
const schema = require("./graphql/schema");
const resolversFunctions = require("./graphql/resolvers");
const GraphQLJSON = require("graphql-type-json");
// admin.initializeApp();
var serviceAccount = require("../recomendador-534fb-firebase-adminsdk-buooi-1331d3a101.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://recomendador-534fb.firebaseio.com"
});
// Provide resolver functions for your schema fields
const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        Comments: resolversFunctions.getComments,
        Activities: resolversFunctions.getActivities
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
    introspection: true
}), conf = {
    cors: {
        origin: "*",
        credentials: true
    }
};
exports.graphql = https.onRequest(server.createHandler(conf));
//# sourceMappingURL=index.js.map