import React from 'react'
import Navbar from './Nav/Navbar'
import BottomBar from './Nav/BottomBar'
import Container from '@/components/Container'
import RenderShots from './RenderShots'

type Props = {}

const ShowPage = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <BottomBar/>
        <Container>
          <RenderShots/>
        </Container>
    </div>
  )
}

export default ShowPage