import React from 'react';
import Listings from './sections/Listings/Listings';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Listings />
    </div>
  );
};

export default App;
