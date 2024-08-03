import React from 'react'
import Navbar from './Nav/Navbar'
import BottomBar from './Nav/BottomBar'

type Props = {}

const ShowPage = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <BottomBar/>
    </div>
  )
}

export default ShowPage