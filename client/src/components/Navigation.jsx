import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav className='site-nav'>
            <div className='nav-left'>
                <h1>DriveCraft <span className='emoji'>🚗</span></h1>
            </div>

            <div className='nav-right'>
                <div className='nav-actions'>
                    <a href='/' className='btn primary'>CUSTOMIZE</a>
                    <a href='/customcars' className='btn'>VIEW CARS</a>
                </div>
            </div>
        </nav>
    )
}

export default Navigation