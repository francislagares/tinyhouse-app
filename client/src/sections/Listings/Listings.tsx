import React from 'react';
import { server } from '../../lib/api';
import { ListingsData } from './types';

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

const Listings = (): JSX.Element => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };
  return (
    <>
      <h2>Tinyhouse Listings</h2>
      <button onClick={fetchListings}>Query Listings</button>
    </>
  );
};

export default Listings;
