import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleWorkout = () => {
    const navigate = useNavigate()
  return (
    <>
    <button onClick={() => navigate(-1)}>Go back</button>
    <div className='singleworkout'>
        Single Page
    </div>
    </>
  )
}

export default SingleWorkout
