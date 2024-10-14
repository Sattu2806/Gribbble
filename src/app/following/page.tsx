import { Suspense } from 'react'
import FollowPage from './FollowPage'
import Container from '@/components/Container'
import BottomBar from '../(Show)/_components/Nav/BottomBar'
import Navbar from '../(Show)/_components/Nav/Navbar'

type Props = {}

const FollowingPage = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <BottomBar />
        <Container>
            <FollowPage />
        </Container>
      </Suspense>
    </div>
  )
}

export default FollowingPage
