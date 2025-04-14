import React, { useRef } from 'react';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// 3D Document Model Component
function DocumentModel() {
  const group = useRef();
  const { nodes, materials } = useGLTF('/document.glb'); // You'll need to provide this model

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.Document.geometry} material={materials.Paper}>
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3}
          metalness={0.1}
          emissive="#4285F4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const carouselRef = useRef();

  const carouselSettings = {
    showThumbs: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 6000,
    transitionTime: 1000,
    showStatus: false,
    stopOnHover: true,
    swipeable: true,
    emulateTouch: true,
    className: "premium-carousel",
    ref: carouselRef
  };

  const slides = [
    {
      image: '/team.jpg',
      text: 'Real-Time Collaboration: Work simultaneously with teams worldwide'
    },
    {
      image: '/access-anywhere.jpg',
      text: 'Effortless Editing: Intuitive tools for seamless document creation'
    },
    {
      image: '/secure.jpg',
      text: 'Enterprise Security: Bank-grade protection for your documents'
    }
  ];

  return (
    <Box 
      component="section"
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        mt: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: `
          linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.secondary.dark} 100%
          )
        `,
      }}
    >
      {/* 3D Document Scene */}
      {!isMobile && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight
              position={[0, 10, 0]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <DocumentModel />
            </Float>
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={1.5}
              enablePan={false}
            />
            <Environment preset="city" />
            <EffectComposer>
              <Bloom 
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
                height={300}
                intensity={1}
              />
            </EffectComposer>
          </Canvas>
        </Box>
      )}

      {/* Content Layer */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
        {/* Hero Text */}
        <Box 
          sx={{
            textAlign: 'center',
            px: 2,
            py: 15,
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <Typography 
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isMobile ? '3rem' : '5rem',
              lineHeight: 1.1,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            DocsG Pro
          </Typography>
          
          <Typography 
            variant="h4"
            component="p"
            sx={{
              mb: 5,
              color: theme.palette.common.white,
              maxWidth: '800px',
              mx: 'auto',
              fontWeight: 300,
              fontSize: isMobile ? '1.2rem' : '1.8rem'
            }}
          >
            The future of <strong>real-time</strong> document collaboration
          </Typography>

          <Button 
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.3rem',
              fontWeight: 700,
              borderRadius: '50px',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 0 20px ${theme.palette.primary.main}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 0 30px ${theme.palette.primary.light}`,
              }
            }}
          >
            Get Started Free
          </Button>
        </Box>

        {/* Premium Carousel */}
        <Box sx={{ 
          width: '90%',
          maxWidth: '1600px',
          mx: 'auto',
          pb: 10,
          position: 'relative',
        }}>
          <Carousel {...carouselSettings}>
            {slides.map((slide, index) => (
              <Box 
                key={index}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
                  transform: 'perspective(1000px)',
                  transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) translateY(-10px) rotateX(5deg)',
                    boxShadow: `0 35px 60px -12px rgba(0, 0, 0, 0.6)`,
                  }
                }}
              >
                <Box
                  component="img"
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: isMobile ? '400px' : '700px',
                    objectFit: 'cover',
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, ${theme.palette.common.black} 30%, transparent 100%)`,
                    color: theme.palette.common.white,
                    p: 4,
                    textAlign: 'center',
                    fontSize: isMobile ? '1.3rem' : '1.6rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {slide.text}
                </Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;