import './ControlledCarousel.css';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

function ControlledCarousel (): JSX.Element {
  const images = ['testimonials/image1.jpg', 'testimonials/image2.jpg', 'testimonials/image3.jpg', 'testimonials/image4.jpg'];
  return (
    <Swiper
      grabCursor
      centeredSlides
      slidesPerView="auto"
      effect="coverflow"
      loop
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }}
      modules={[EffectCoverflow]}
    >
      <div className="swiper-wrapper">
        {images.map((image) => (
          <SwiperSlide
            key={image}
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default ControlledCarousel;
