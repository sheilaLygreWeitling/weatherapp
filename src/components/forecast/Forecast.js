import React from 'react'

const weekDays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"]

const Forecast = ({ data }) => {

    const dayInAWeek = new Date().getDay()
    const forecastDays = weekDays.slice(dayInAWeek, weekDays.length).concat(weekDays.slice(0, dayInAWeek))

    return (
        <div className='bg-[#E3F4FC] p-7 m-5 rounded-tl-lg rounded-bl-lg shadow-xl'>
            <h1 className='text-2xl font-bold underline text-center'>Daily forecast</h1>
            <div className=' flex overflow-x-auto'>
                {data.list.slice(0, 7).map((item, index) => (
                    <div className='p-5 text-center md:p-8 lg:p-8 xl:p-8'>
                        <div className='w-[128px] h-[128px]'>
                            <img src={`icons/${item.weather[0].icon}.png`} alt="weather" />
                        </div>
                        <p className='text-lg font-semibold'>{forecastDays[index]}</p>
                        <p>{item.weather[0].description}</p>
                        <p>{Math.round(item.main.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast