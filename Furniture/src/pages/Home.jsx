import React from 'react';
import HeroSection from '../Component/Home/HeroSection';
import Aboutus from '../Component/Home/Aboutus';
import Design from '../Component/Home/Design';
import DesignService from '../Component/Home/DesignService';
import PeopleDesign from '../Component/Home/PeopleDesign';


const Home = () => {
    return (
        <>
            <HeroSection />
            <Aboutus />
            <DesignService />
            <Design />
            <PeopleDesign />
        </>
    )
}

export default Home