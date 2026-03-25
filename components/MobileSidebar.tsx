import React from 'react'
import { Menu } from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from './Sidebar'
  

const MobileSidebar = () => {
  return (
   <Sheet >
    <SheetTrigger>
        <Menu className='text-white' />
    </SheetTrigger>
    {/* @ts-ignore - SheetContent from JS shadcn lacks strictly typed children prop */}
    <SheetContent side="left"  >
        <Sidebar/>
    </SheetContent>
   </Sheet>
  )
}

export default MobileSidebar