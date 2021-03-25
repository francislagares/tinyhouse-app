import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { typeDefs, resolvers } from './graphql';

const app: Application = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

export { app, server };
