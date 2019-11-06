const { gql } = require('apollo-server-cloud-functions')

const schema = gql`

  type Comment {
      activity: String!
      author: String!
      id: String!
      comment: String!
      date: String!
  }

  type Query {
    comments(activity: ID): [Comment]!
  }

  type Mutation {
      comment(activity: String!, author: String!, comment: String!, date: String!): Comment!
  }
`

module.exports = schema