import React from 'react'
import FollowPage from './FollowPage'
import Container from '@/components/Container'
import BottomBar from '../(Show)/_components/Nav/BottomBar'
import Navbar from '../(Show)/_components/Nav/Navbar'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <BottomBar/>
        <Container>
          <FollowPage/>
        </Container>
    </div>
  )
}

export default page