import React, { useState } from 'react';
import './Carousel.css';


const images = [
  '/images/image1.jpg',
  '/images/image2.jpeg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg'
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="carousel">
      <img src={images[currentIndex]} alt="carousel" className="carousel-image" />
    </div>
  );
};

export default Carousel;