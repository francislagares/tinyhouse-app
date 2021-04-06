import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { Database, Booking, Listing, User } from '../lib/types';

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/tinyhouse?retryWrites=true&w=majority`;

export const connectDB = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('tinyhouse');

  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
  };
};
