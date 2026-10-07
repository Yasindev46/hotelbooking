import React, { useState } from 'react';
import './Carousel.css';


const images = [
  `${process.env.PUBLIC_URL}/images/image1.jpg`,
  `${process.env.PUBLIC_URL}/images/image2.jpeg`,
  `${process.env.PUBLIC_URL}/images/image3.jpg`,
  `${process.env.PUBLIC_URL}/images/image4.jpg`,
  `${process.env.PUBLIC_URL}/images/image5.jpg`
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