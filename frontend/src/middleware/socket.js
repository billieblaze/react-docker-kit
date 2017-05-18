import * as actions from '../actions';
import io from 'socket.io-client';

var socket = null;

export function socketMiddleware(store) {
  socket = io.connect(`http://localhost/mapper`);

  socket.on('connected', data => {
    store.dispatch(actions.connectMessage(data));
  });

  socket.on('message', data => {
    //console.log('socket message', data);
    store.dispatch(actions.incomingMessage(data));
  });

  socket.on('disconnected', data => {
    store.dispatch(actions.disconnectMessage(data));
  });


  return next => action => {
    const result = next(action);

    if (socket && action.type === actions.ADD_MESSAGE) {
      let messages = store.getState().messages;
      socket.emit('message', messages[messages.length -1]);
    }

    return result;
  };
}
