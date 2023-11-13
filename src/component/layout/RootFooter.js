import React from 'react'
import Playstore from '../../images/playstore.png'
import Appstore from '../../images/Appstore.png'

function Footer() {
  return (
    <div className='
      bg-dark p-5 text-white 
      d-flex flex-row justify-content-between'>
      
      {/* left section */}
      <div className='mx-2 w-25'>
        <span className='h6 pe-none'
          style={{fontSize: "x-small"}}>
          Download our app for Android and iOS mobile phone
        </span>
        <img src={Playstore} alt='playstore' className='w-75 py-2'
          style={{cursor:"pointer"}}></img>
        <img src={Appstore} alt='Appstore' className='w-75'
          style={{cursor:"pointer"}}></img>
      </div>

      {/* mid section */}
      <div className='mx-2 w-50 text-center pe-none'>
        <div className='display-1 mb-3'>
          Harvest Hack
        </div>
        <div className='fs-6 lead text-warning'>
          Make Your Deals
        </div>
        <div className='fs-6 lead'>
          Copyright 2023 &copy; iRo 
        </div>
      </div>

      {/* right section */}
      <div className='mx-2 w-25 text-end px-1 my-auto'>
        <span className='fs-6 text-decoration-underline pe-none'>Follow us</span>
        <div></div>
          <a className='lead fs-5 text-white text-decoration-none' href="https://instagram.com/"
          style={{cursor:"pointer"}}>Instagram</a>
        <div></div>
          <a className='lead fs-5 text-white text-decoration-none' href="https://youtube.com/"
          style={{cursor:"pointer"}}>Youtube</a>
        <div></div>
         <a className='lead fs-5 text-white text-decoration-none' href="https://facebook.com/"
          style={{cursor:"pointer"}}>Facebook</a>
      </div>
    </div>
  )
}

export default Footer