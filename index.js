// Import the required libraries
import express from 'express'
import graphqlHTTP from 'express-graphql'

import schema from './schema'

express()
  .use('/graphql', graphqlHTTP({ schema, graphiql: true }))
  .listen(3000)

console.log('GraphQL server running on http://localhost:3000/graphql')
