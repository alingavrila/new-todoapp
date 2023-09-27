type Todo @model @auth(rules: [{allow: public, operations: [create, read, update, delete]}, {allow: owner}]) {
    id: ID!
    name: String!
    description: String
    owner: String!
  }