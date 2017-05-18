var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout); 

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
         
        </div>
        
        <div key={'b'}>
          <h2>Todo</h2>
         
        </div>
        <div key={'e'}>
          <h2>Map</h2>
          <MapView />
        </div>
      </ReactGridLayout>
     </div>

    )

