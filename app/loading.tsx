import loading from './../assets/loading.gif'
import Image from 'next/image'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="grid w-[100vw] h-[100vh] bg-black place-content-center">
            <Image
            className=''
                src={loading}
                alt="Loading..."
            />
        </div>
    )
  }