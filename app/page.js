import React from 'react'
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className='p-10 flex flex-col items-center justify-center' >
      <h1 className='red font-bold text-[22px]'>Welcome to AI Mock Interview</h1>
      <a href={"/dashboard"} ><h1><Button>Start</Button></h1></a>
    </div>
  )
}

export default page