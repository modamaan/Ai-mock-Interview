import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border border-t-2 border-slate-200 p-2" >
        <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full' >
            <Button size="lg" variant="ghost" className="w-full flex-gap-2" >
                <Image className='text-center' src="/leetcode.svg" alt="leetcode" height={30} width={40} />Leetcode
            </Button>
            <Button size="lg" variant="ghost" className="w-full flex gap-2" >
                <Image src="/develop.svg" alt="leetcode" height={30} width={40} />
                Software Development
            </Button>
            <Button size="lg" variant="ghost" className="w-full flex gap-2" >
                <Image src="/machine.svg" alt="leetcode" height={30} width={40} />
                Machine Learning
            </Button>
        </div>
    </footer>
  )
}

export default Footer