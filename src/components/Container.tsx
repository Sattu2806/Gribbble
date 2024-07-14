import React, { ReactNode } from 'react'

type Props = {}

const Container = ({children}:{children:ReactNode}) => {
  return (
    <div className='max-w-[1400px] xl:px-8 md:px-6 sm:px-3 px-4 mx-auto'>
        {children}
    </div>
  )
}

export default Container