import React from 'react'
import SearchHeader from '../SearchHeader'
import Navbar from '../../_components/Nav/Navbar'
import SearchResults from '../SearchResults'
import Container from '@/components/Container'

type Props = {}

const page = ({params}:{params:{searchString:string}}) => {
  return (
    <div>
        <Navbar searchString={params.searchString}/>
        <SearchHeader params={params}/>
        <Container>
            <SearchResults params={params}/>
        </Container>
    </div>
  )
}

export default page