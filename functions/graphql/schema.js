const { gql } = require('apollo-server-cloud-functions')

const schema = gql`

  type Comment {
      activity: String!
      author: String!
      id: String!
      comment: String!
      date: String!
      username: String!
  }

  type User {
    username: String!
    id: String!
  }

  type Query {
    comments(activity: ID!): [Comment]!
  }

  type Mutation {
      comments(activity: String!, author: String!, comment: String!, date: String!, username: String!): Comment!
      users(id: ID!, username: String!): User!
  }
`

module.exports = schema