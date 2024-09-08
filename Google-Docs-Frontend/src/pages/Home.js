import React from 'react'
import Features from '../components/Features'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import CTA from '../components/CTA'
import './Home.css'
export default function Home() {
  return (
    <div>
        <Header />
        <Hero />
        <CTA />
        <Features />
        <Footer />
    </div>
  )
}
