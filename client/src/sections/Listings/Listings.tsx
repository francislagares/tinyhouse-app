import React, { useState } from 'react';
import { server } from '../../lib/api';
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
  Listing,
} from './types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

const Listings = (): JSX.Element => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(data.listings);
  };

  const listingList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>
              Delete Listing
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };

  return (
    <>
      <h2>Tinyhouse Listings</h2>
      {listingList}
      <button onClick={fetchListings}>Query Listings</button>
    </>
  );
};

export default Listings;
