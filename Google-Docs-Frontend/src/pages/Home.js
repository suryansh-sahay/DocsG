import React, { useState } from "react";
import Features from "../components/Features";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import "./Home.css";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Simulated login state (replace with actual auth logic if needed)
  const [user, setUser] = useState(null); // or useContext(AuthContext) if you're using context

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Header
        isDarkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
        isLoggedIn={user !== null}
      />
      <Hero />
      <CTA />
      <Features />
      <Footer />
    </div>
  );
}
