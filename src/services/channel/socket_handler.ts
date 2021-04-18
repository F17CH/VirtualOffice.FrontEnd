import { Socket } from "phoenix";

var socket: Socket;

export function initSocket() : void {
    const newSocket = new Socket("ws://localhost:4010/socket/", {})

    newSocket.onOpen(event => console.log('Connected.'))
    newSocket.onError(event => console.log('Cannot connect.'))
    newSocket.onClose(event => console.log('Goodbye.'))
    
    newSocket.connect()

    socket = newSocket;
}

export function getSocket() : Socket {
    return socket;
}