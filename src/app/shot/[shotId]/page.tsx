import React from 'react'
import ShotPage from './ShotPage'

type Props = {}

const page = ({params}:{params:{shotId:string}}) => {
  return (
    <div>
        <ShotPage params={params} />
    </div>
  )
}

export default page