import { IResolvers } from 'apollo-server-express';
import { Database, Listing, Booking } from '../../../lib/types';

export const bookingResolvers: IResolvers = {
  Listing: {
    id: (booking: Booking): string => {
      return booking._id.toString();
    },
    listing: (
      booking: Booking,
      _args: Record<string, unknown>,
      { db }: { db: Database },
    ): Promise<Listing | null> => {
      return db.listings.findOne({ _id: booking.listing });
    },
  },
};
