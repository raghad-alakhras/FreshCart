import React from 'react'
import { Spinner } from "@/components/ui/spinner"
export default function loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
       <Spinner />
    </div>
  )
}
