import React from 'react';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
function Hero() {
  const marginTopStyle = {
    marginTop: '0px',
  };
  return (
    <section className="hero" style={marginTopStyle}>
      <div className="hero-content">
        <h1>Welcome to Google Docs Clone</h1>
        <p>Collaborate and edit documents in real-time with ease.</p>
      </div>
      <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}className="carousel" >
        <div  >
          <img src='/team.jpg' alt="Image 1"/>
          <p className="legend">Real-Time Collaboration: "Experience seamless real-time collaboration on documents with teams worldwide."</p>
        </div>
        <div>
          <img src="/access-anywhere.jpg" alt="Image 2" />
          <p className="legend">Effortless Editing: "Effortlessly edit and enhance your documents with our user-friendly tools."</p>
        </div>
        <div>
          <img src="/access-anywhere.jpg" alt="Image 3" />
          <p className="legend">"Unlock your document potential with anytime, anywhere access and unrivaled security."</p>
        </div>
      </Carousel>

    </section>
  );
}

export default Hero;
