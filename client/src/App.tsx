import React from 'react';
import './App.css';
import Listings from './sections/Listings/Listings';

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Listings />
    </div>
  );
};

export default App;
