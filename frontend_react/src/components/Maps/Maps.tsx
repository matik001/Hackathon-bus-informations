import { useState } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

interface MapsProps{

}
const Maps = withScriptjs(withGoogleMap(({}:MapsProps)=> {

  return (
    <div>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        />
    </div>
  )
}))

export default Maps
