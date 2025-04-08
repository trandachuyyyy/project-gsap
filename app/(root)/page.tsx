'use client'
import React, { useEffect } from 'react'
import SesionHome from './components/SesionHome'
import SesionAbout from './components/SesionAbout'
import SesionProject from './components/SesionProject'
import SesionSkills from './components/SesionSkills'
import SesionDetailAbout from './components/SesionDetailAbout'
import SesionOtherText from './components/SesionOtherText'
import SectionFalling from './components/SectionFalling'

const Page = () => {

    return (

        <div id='your-smoother-element-id' data-hero className='h-full flex flex-col bg-gray-100 '>
            <SesionHome className='px-8 ' />
            <SesionOtherText />
            {/* <SesionDetailAbout className='px-8' /> */}
            <SesionSkills className='px-8' />
            <SesionProject className='px-8' />
            <SesionAbout className='px-8' />
            <SectionFalling />
        </div>
    )
}

export default Page