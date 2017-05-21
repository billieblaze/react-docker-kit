import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const location = [35.9940, -78.8986]

export class MapView extends Component {
  constructor(props) {

    super(props)
    console.log(this.props)

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
         <Map center={[0,0]} zoom={1} style={{ height: '400px', marginBottom: '20px' }}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          {this.props.messages.map(message => (
            <Marker key={message.timestamp} position={message.location}>
              <Popup>
                <span>{message.type}<br/>{message.value}</span>
              </Popup>
            </Marker>))}
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
              <TableRowColumn>{row.message.data.location.latitude}, {row.message.data.location.longitude}</TableRowColumn>
            </TableRow>
            ))}

         </TableBody>
       </Table>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  messages: state.messages,
  currentMessage: state.currentMessage
})

export default connect(mapStateToProps)(MapView)
