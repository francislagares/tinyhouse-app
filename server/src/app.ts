import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { schema } from './graphql';

const app: Application = express();
const server = new ApolloServer({ schema });

server.applyMiddleware({ app, path: '/api' });

export { app };
