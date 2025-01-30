import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-[600px] flex justify-center items-center'>
      <Loader2 className='animate-spin' size="2em" />
    </div>
  )
}

export default Loading