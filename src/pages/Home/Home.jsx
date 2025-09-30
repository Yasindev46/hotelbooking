import React from 'react';
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
  return (
    <div className='home-bg'>
      <div className='home-overlay'>
        <div className='home-content'>
          <h1 className='home-title'>Welcome to Jeeshan Hotel</h1>
          <p className='home-subtitle'>
            Experience luxury and comfort in the heart of the city.<br />
            Book your stay with us and enjoy world-class amenities.
          </p>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
