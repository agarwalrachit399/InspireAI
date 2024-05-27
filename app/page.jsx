'use client';

import { useEffect, useState } from 'react';
import Feed from '@components/Feed';

const Home = () => {

  const words = ["Discover", "Create", "Share"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
        Unleash Your Creativity with 
            <br className="max-md:hidden" />
            <span className="blue_gradient_main text-center">
                AI Powered Prompts</span>
            </h1>
            <p className="desc text-center">
            Inspire AI is your ultimate platform for crafting and sharing AI-powered prompts.
             Whether you're seeking inspiration or looking to spark creativity in others, 
             Inspire AI offers a seamless, intuitive interface where your ideas can come to life.
            </p>
            <h2 className='head_text'>
            {words[currentIndex]} ...
            </h2>

            <Feed/>

            <p className='desc text-center mb-4'>Created by <a href="https://github.com/agarwalrachit399/" target='blank'><strong>Rachit Agarwal</strong></a></p> 
    </section>
  )
}

export default Home