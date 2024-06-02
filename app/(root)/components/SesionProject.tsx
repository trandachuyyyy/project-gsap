import Image from 'next/image'
import React from 'react'

const SesionProject = ({ className }: { className: string }) => {
    const projects = [
        {
            name: 'Project 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },
        {
            name: 'Project 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },
        {
            name: 'Project 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },
        {
            name: 'Project 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },
        {
            name: 'Project 5',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },
        {
            name: 'Project 6',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, eum?',
            url: 'https://github.com/huytran2000',
            image: '/profile/next.ico',
            imageUser: '/profile/huy.jpg'
        },

    ]
    return (
        <div className={`flex flex-col gap-8 ${className}`}>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>Project</h1>
            <h1 className='w-full text-start py-2'>
                Implemented projects
            </h1>
            <div className={`bg-gray-100 flex w-full flex-wrap gap-4  justify-center`} >
                {
                    projects.map(e => {
                        return <>
                            <div key={e.name} className="h-72 w-[30%] relative bg-gray-500  rounded-2xl">
                                <Image
                                    src={e.image}
                                    width={1280}
                                    height={1024}
                                    alt=''
                                    className='size-full object-contain'
                                />
                                <div className="absolute flex items-center gap-2 bottom-0 bg-gray-600 px-4 py-2 w-full rounded-br-2xl rounded-bl-2xl">
                                    <div className="size-8">
                                        <Image
                                            src={e.imageUser}
                                            width={1280}
                                            height={1024}
                                            alt=''
                                            className='size-full object-cover rounded-full'
                                        />
                                    </div>
                                    <h1 className='text-xl text-white font-bold '>
                                        {e.name}
                                    </h1>
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default SesionProject