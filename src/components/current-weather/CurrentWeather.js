import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, usePresence } from "framer-motion"
import { gsap } from "gsap";

const CurrentWeather = ({ data }) => {

    function Box() {
        const ref = useRef(null);
        const [isPresent, safeToRemove] = usePresence();

        useEffect(() => {
            if (!isPresent) {
                gsap.to(ref.current, {
                    opacity: 0,
                    onComplete: () => safeToRemove?.()
                });
            }
        }, [isPresent, safeToRemove]);

        return <div className="box" ref={ref} />;
    }

    const [show, setShow] = useState(false);


    return (
        <div>
            <section className='
            bg-[#E3F4FC] p-7 m-5 flex justify-between rounded-tl-lg rounded-bl-lg shadow-xl 
            md:bg-[#E3F4FC] md:flex md:justify-around '>
                <div>
                    <p className='font-semibold md:text-6xl'>{data.city}</p>
                    <p className='font-light pt-2 md:text-3xl md:pt-4'>{data.weather[0].description}</p>
                    <p className='font-bold text-5xl pt-4 md:text-7xl'>{Math.round(data.main.temp)}°C</p>
                </div>
                <div className='md:p-5'>
                    <img src={`icons/${data.weather[0].icon}.png`} alt="weather" />
                </div>
            </section>

            <div className='dropdown block md:hidden'>
                <div className=" ">
                    <div className="">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setShow(!show);
                            }}
                            className='bg-[#E3F4FC] p-7 m-5 rounded-tl-lg rounded-bl-lg flex justify-between shadow-xl'
                        >
                            {show ? "Hide details" : "Show details"}
                        </motion.button>
                    </div>
                    <AnimatePresence>{show ?
                        <div className=' bg-[#E3F4FC] p-7 m-5 rounded-tl-lg rounded-bl-lg flex justify-between shadow-xl'>
                            <ul>
                                <li>
                                    <span>Feels like</span>
                                    <span> {Math.round(data.main.feels_like)}°C</span>
                                </li>
                                <li>
                                    <span>Wind</span>
                                    <span> {Math.round(data.wind.speed)} m/s</span>
                                </li>
                                <li>
                                    <span>Humidity</span>
                                    <span> {Math.round(data.main.humidity)}%</span>
                                </li>
                                <li>
                                    <span>Pressure</span>
                                    <span> {Math.round(data.main.pressure)} pHa</span>
                                </li>
                            </ul>
                        </div> : null}</AnimatePresence>

                </div>
                <section className='bg-[#00cccc] p-7 m-5 rounded-tl-lg rounded-bl-lg flex justify-between shadow-xl hidden md:block'>
                    <div className='font-light'>
                        <div>
                            <span>Feels like</span>
                            <span> 22 celsius</span>
                        </div>
                        <div>
                            <span>Wind</span>
                            <span> 2 m/s</span>
                        </div>
                        <div>
                            <span>Humidity</span>
                            <span>  20%</span>
                        </div>
                        <div>
                            <span>Pressure</span>
                            <span> 15 pHa</span>
                        </div>
                    </div>
                </section >
            </div>
        </div >
    )
}

export default CurrentWeather