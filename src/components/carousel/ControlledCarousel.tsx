import './ControlledCarousel.css';
import React, { useState, useRef } from 'react';
import { TESTIMONIALS } from './testimonials';
import { Swiper, SwiperSlide } from 'swiper/react';

function ControlledCarousel (): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = (): void => {
    setCurrentIndex(currentIndex === 0 ? TESTIMONIALS.length - 1 : currentIndex - 1);
  };

  const handleNext = (): void => {
    setCurrentIndex(currentIndex === TESTIMONIALS.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        <div className='slider-prev' onClick={handlePrev}>
          <img className="testimonial-image" src={TESTIMONIALS[currentIndex === 0 ? TESTIMONIALS.length - 1 : currentIndex - 1].image} alt="" />
        </div>
        <div className='slider-current'>
          <img className="testimonial-image " src={TESTIMONIALS[currentIndex].image} alt="" />
          <div>
            <h4>{TESTIMONIALS[currentIndex].achieved}</h4>
            <p>{TESTIMONIALS[currentIndex].quote}</p>
          </div>
        </div>
        <div className='slider-next' onClick={handleNext}>
          <img className="testimonial-image" src={TESTIMONIALS[currentIndex === TESTIMONIALS.length - 1 ? 0 : currentIndex + 1].image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ControlledCarousel;
