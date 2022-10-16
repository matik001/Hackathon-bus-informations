import { useState } from 'react'
import { GoogleMap, Marker } from "react-google-maps"
import Maps from '../../components/Maps/Maps'


function MainPage() {
    
  return (
    <div className="App">
        <Maps
            googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + import.meta.env.VITE_GOOGLE_API_KEY}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
  )
}

export default MainPage
