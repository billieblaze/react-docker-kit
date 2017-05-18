import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer } from 'react-leaflet'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const position = [35.9940, -78.8986]

export class MapView extends Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  componentDidMount() {

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

        <Table>
         <TableHeader>
           <TableRow>
             <TableHeaderColumn>ID</TableHeaderColumn>
             <TableHeaderColumn>Time</TableHeaderColumn>
             <TableHeaderColumn>Type</TableHeaderColumn>
             <TableHeaderColumn>Value</TableHeaderColumn>
             <TableHeaderColumn>Location</TableHeaderColumn>
           </TableRow>
         </TableHeader>
         <TableBody>
         {this.props.messages.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>{row.id}</TableRowColumn>
              <TableRowColumn>{row.time}</TableRowColumn>
              <TableRowColumn>{row.type}</TableRowColumn>
              <TableRowColumn>{row.value}</TableRowColumn>
              <TableRowColumn>{row.location.latitude}, {row.location.latitude}</TableRowColumn>
            </TableRow>
            ))}

         </TableBody>
       </Table>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  messages: state.messages
})

export default connect(mapStateToProps)(MapView)
