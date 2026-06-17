import React, { Suspense } from 'react'

const ProfileComponent = React.lazy(()=> import ('./profile/BoaProfile'))
const Loader = () => {
  return (
    <div>
        <h4>Lazy loaded component</h4>
        <Suspense fallback={<div>Loading profile module... please wait</div>}>
            <ProfileComponent/>
        </Suspense>
    </div>
  )
}

export default Loader