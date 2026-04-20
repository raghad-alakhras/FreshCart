import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import ProfileInfoForm from './ProfileInfoForm'

import { getTokenFun } from '@/utilties/getTokenFun'
import { jwtDecode } from 'jwt-decode'
import ChangePassword from './ChangePassword'

export default async function page() {

    const token =await getTokenFun()
    const tokenData = await jwtDecode<{id:string,role:string,name:string}>(token!)
   
  return (
    <>
        <div className='my-5'>
          <h6>Account Settings</h6>
          <p className='text-gray-600 mt-2'>Update your profile information and change your password</p>
        </div>

        <div>
            <ProfileInfoForm userData={tokenData}/>
            <ChangePassword/>
        </div>

    </>
  )
}
