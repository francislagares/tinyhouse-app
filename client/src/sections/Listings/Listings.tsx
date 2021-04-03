import React from 'react';
import { Alert, Avatar, Button, List, Spin } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import { Listings as ListingsData } from './__generated__/Listings';
import { ListingsSkeleton } from './components';
import './styles/Listings.css';

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

const Listings = ({ title }: Props): JSX.Element => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteListing = async (id: string): Promise<void> => {
    await deleteListing({ variables: { id } });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={listing => (
        <List.Item
          actions={[
            <Button
              key={listing.id}
              type='primary'
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape='square' size={48} />}
          />
        </List.Item>
      )}
    ></List>
  ) : null;

  if (loading) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type='error'
      message='Uh oh! Something went wrong :(. Please try again later.'
      className='listings__alert'
    />
  ) : null;

  return (
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
        <h2>{title}</h2>
        {listingList}
      </Spin>
    </div>
  );
};

export default Listings;
