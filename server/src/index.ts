import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import { connectDB } from './database';
import { typeDefs, resolvers } from './graphql';

dotenv.config();

const mount = async (app: Application): Promise<void> => {
  const db = await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: '/api' });

  app.listen(process.env.PORT, () =>
    console.log(`[node-server]: http://localhost:${process.env.PORT}`),
  );

  const listings = await db.listings.find({}).toArray();
};

mount(express());
