import React from 'react';
import { useQuery, useMutation } from '../../lib/api';
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string): Promise<void> => {
    await deleteListing({ id });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete Listing
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later :(</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Uh oh! Something went wrong - please try again later :(</h4>
  ) : null;

  return (
    <>
      <h2>Tinyhouse Listings</h2>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </>
  );
};

export default Listings;
