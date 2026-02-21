import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import FeaturedHotspots from '../components/FeaturedHotspots';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased">
            <Header />
            <main>
                <Hero />
                <StatsBar />
                <FeaturedHotspots />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
