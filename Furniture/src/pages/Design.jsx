import React from 'react'
import Basin from '../assets/basin.webp'

const Design = () => {
  return (
    <div className='bg-amber-300 w-full flex-col flex items-center px-20 py-20'>
        <div >
            <h1 className=" typewriter-base animate-typing text-8xl font-mono">
            Spaces We’ve Designed
            </h1>
        </div>
        <div className='pt-15 flex gap-10'>
            <div>
                <img src={Basin} alt="Image"  className='h-80'/>
            </div>
            <div>
                <img src={Basin} alt="images" className='h-80' />
            </div>
            <div>
                <img src={Basin} alt="image" className='h-80' />
            </div>
        </div>
    </div>
  )
}

export default Design