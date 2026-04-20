import React from 'react'
import ForgetPassCard from '../_components/ForgetPassCard/ForgetPassCard'
import EnterUserMail from './EnterUserMail'

export default function page() {
  return (
   <div className='container mx-auto max-w-[1280px]'>
   
     <div className='md:flex md:gap-4 *:md:w-1/2 my-20'>
        <ForgetPassCard/>  
        <EnterUserMail/>
    </div>
    
   </div>
  )
}
