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

  type Query {
    comments(activity: ID!): [Comment]!
  }

  type Mutation {
      PostComment(activity: String!, author: String!, comment: String!, date: String!, username: String!): Comment!
      DeleteComment(id: ID!): String!
  }
`

module.exports = schema