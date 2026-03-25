import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center' >
        <Loader2 className='h-6 w-6 text-muted-foreground animate-ping' />
    </div>
  )
}

export default Loader