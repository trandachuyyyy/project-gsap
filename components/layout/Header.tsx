import React from 'react'

const Header = () => {
    const nav = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Project', href: '/project' },
    ]
    return (
        <div className='bg-gray-200 sticky top-0 z-10'>
            <div className="flex items-center justify-between py-4 px-8">
                <div className='text-base font-semibold uppercase'>Huy Tran</div>
                <div className="flex justify-between gap-4">
                    {nav.map((e) => {
                        return (
                            <div className='text-base font-semibold' key={e.name}>
                                {e.name}
                            </div>
                        )
                    })
                    }
                </div>
            </div>

        </div>
    )
}

export default Header