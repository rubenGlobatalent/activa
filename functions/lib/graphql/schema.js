"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require("apollo-server-cloud-functions");
const schema = gql `
  scalar JSON

  type Comment {
    activity: String!
    author: String!
    id: String!
    comment: String!
    date: String!
    username: String!
  }

  enum Type {
    Point
    LineString
  }

  type Geometry {
    type: Type!
    coordinates: JSON
  }

  type Properties {
    id: ID
  }

  type Feature {
    # properties: Properties
    geometry: Geometry!
  }

  type FeatureCollection {
    type: String!
    features: [Feature]!
  }

  type Query {
    Comments(activity: ID!): [Comment]!
    Activities(id: ID): FeatureCollection!
  }
  type Mutation {
    PostComment(
      activity: String!
      author: String!
      comment: String!
      date: String!
      username: String!
    ): Comment!
    DeleteComment(id: ID!): String!
  }
`;
module.exports = schema;
//# sourceMappingURL=schema.js.map