// Import the required libraries
var graphql = require('graphql')
var express = require('express')
var graphqlHTTP = require('express-graphql')

var data = require('./data.json')

// Define the User type, each field has their own type.
//description
var userType = new graphql.GraphQLObjectType({
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
      resolve: function (_, args) {
        return data[args.id].name
      }
    }
  }
})

// Import the data you created above

http://graphql.org/docs/api-reference-type-system/#graphqlschema
var schema = new graphql.GraphQLSchema({
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

express()
  .use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))
  .listen(3000)

console.log('GraphQL server running on http://localhost:3000/graphql')
