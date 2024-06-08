import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-full'>
        <Lottie animationData={loadingAnimation} className='w-1/2 aspect-square'/>
    </div>
  )
}
