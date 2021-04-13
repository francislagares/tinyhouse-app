/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Avatar, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { Viewer } from '../../../../lib/types';
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../../../lib/utils';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props): JSX.Element => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotification(`You've successfully logged out!`);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: data => {
      displayErrorMessage(
        `Sorry! We weren't be able to log you out. Please try again later!`,
      );
    },
  });

  const handleLogOut = (): void => {
    logOut();
  };

  const subMenuLogin = viewer.id ? (
    <SubMenu title={<Avatar src={viewer.avatar} />}>
      <Item key='/user'>
        <Link to={`/user/${viewer.id}`}>
          <UserOutlined />
          Profile
        </Link>
      </Item>
      <Item key='/logout'>
        <div onClick={handleLogOut}>
          <LogoutOutlined />
          Log out
        </div>
      </Item>
    </SubMenu>
  ) : (
    <Item>
      <Link to='/login'>
        <Button type='primary'>Sign In</Button>
      </Link>
    </Item>
  );

  return (
    <Menu mode='horizontal' selectable={false} className='menu'>
      <Item key='/host'>
        <Link to='/host'>
          <HomeOutlined />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
