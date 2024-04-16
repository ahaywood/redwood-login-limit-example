export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    attempts: Int
    unlockedAt: DateTime
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    updateLoginAttempt(email: String!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
