import React, { Component, PropTypes } from 'react'
import { Map, TileLayer } from 'react-leaflet'

const io = require('socket.io-client')
//const socket = io()

const position = [51.0, -0.09]

export class MapView extends Component {
  constructor(props) {
    super(props)
    
    this.state = {code: ''}
    
    // socket.on('connected', (payload) => {   
    //   console.log(payload);
    // })
  }

  componentDidMount() {  
    // socket.emit('ping')
  }


  render() {
    return (
      <div>
        <Map
          style={{height: "100vh"}}
          center={position}
          zoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/billieblaze/cj2p24sh0001a2rqtugfmqyrq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlsbGllYmxhemUiLCJhIjoiY2oxamkxM2s1MDIxeTMyb3Y5MjJlYmU4dCJ9.YJrBCv_97Dm2eCN8eXecww"
            attribution="© Mapbox © OpenStreetMap © DigitalGlobe" />
        </Map>
      </div>
    )
  }
}
