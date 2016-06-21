const graphql = require('graphql')

import data from './data.json'

// Define the User type, each field has their own type.
const userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: "Data of user",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    homeland: { type: graphql.GraphQLString },
    friend: {
      type: graphql.GraphQLString,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, args) => data[args.id].name
    }
  }
})

// Import the data you created above

// http://graphql.org/docs/api-reference-type-system/#graphqlschema
export default new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    description: "What ever",
    name: 'userData',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: graphql.GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        resolve: function (_, args) {
          return data[args.id]
        }
      },
      users: {
        type: new graphql.GraphQLList(userType),
        resolve: function () {
          return [data['1'], data['2'], data['3']]
        }
      }
    }
  })
})
