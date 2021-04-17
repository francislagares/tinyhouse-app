import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

interface Props {
  listing: {
    id?: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
  };
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props): JSX.Element => {
  const { title, image, address, price, numOfGuests } = listing;

  return (
    <Card
      hoverable
      cover={
        <div
          style={{ backgroundImage: `url(${image})` }}
          className='listing-card__cover-img'
        />
      }
    >
      <div className='listing-card__details'>
        <div className='listing-card__description'>
          <Title level={4} className='listing-card__price'>
            {price}
            <span>/day</span>
          </Title>
          <Text strong ellipsis className='listing-card__title'>
            {title}
          </Text>
          <Text ellipsis className='listing-card__address'>
            {address}
          </Text>
        </div>
        <div className='listing-card__dimensions listing-card__dimensions--guests'>
          <UserOutlined /> <Text>{numOfGuests} guests</Text>
        </div>
      </div>
    </Card>
  );
};
