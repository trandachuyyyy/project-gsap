'use client'
import React, { useEffect } from 'react'
import SesionHome from './components/SesionHome'
import SesionAbout from './components/SesionAbout'
import SesionProject from './components/SesionProject'
import SesionSkills from './components/SesionSkills'

const Page = () => {

    return (
        <div className='h-full py-4  flex flex-col gap-8 bg-gray-100 '>
            <SesionHome className='px-8 ' />
            <SesionAbout className='px-8' />
            <SesionSkills className='px-8' />
            <SesionProject className='px-8' />
        </div>
    )
}

export default Page