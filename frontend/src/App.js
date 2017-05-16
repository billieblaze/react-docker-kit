var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { connect } from 'react-redux'

import io from 'socket.io-client';
import Progress from './components/Progress';
import {MapView} from './components/MapView';
import {DataTable} from './components/DataTable';

import { addTodo } from './actions/actions'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'


import { serverUrl, port } from './config';
let socket = io.connect(`${serverUrl}:${port}/mapper`);

class App extends Component {
  constructor () {
    super();
    socket.on('server:event', data => {
      this.setState({data})
    });
  }

  state = {
    progress: 0
  };

  componentDidMount() {
    socket.on('connected', this._connected);
    socket.on('progress', this._progress);
  }


  @autobind
  _connected(e) {
    console.info('action: connected');
    if (e) {
      console.info(e);
    }
  }

  renderHeader(){
      return (
        <div>
        <h1>Rover Data Mapping</h1>
        </div>
      );
  }


  render() {
    const { dispatch, visibleTodos } = this.props
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 4, static: true},
      {i: 'b', x: 0, y: 4, w: 2, h: 4, static: true},
      {i: 'c', x: 0, y: 8, w: 2, h: 4, static: true},
      {i: 'd', x: 0, y: 12, w: 2, h: 4, static: true},
      {i: 'e', x: 4, y: 0, w: 10, h: 2, static: true}
    ];
  
    return (
    <div>
     {this.renderHeader()}
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key={'a'}>
          <h2>Datatable</h2>
          <DataTable />
        </div>
        
        <div key={'b'}>
          <h2>Todo</h2>
          <AddTodo
               onAddClick = {text =>
               dispatch(addTodo(text))}
            />
        
          <TodoList todos = {visibleTodos}/>
        </div>
        <div key={'e'}>
          <h2>Map</h2>
          <MapView />
        </div>
      </ReactGridLayout>
     </div>

    )

  }
}

function select(state) {
   return {
      visibleTodos: state.todos
   }
}

export default connect(select)(App)