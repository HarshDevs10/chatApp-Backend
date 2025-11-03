import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000})
let allSocket: WebSocket[] = []

wss.on('connection', (Socket) => {
    allSocket.push(Socket)

    Socket.on('message', (e) => {
          allSocket.forEach((client) => {
            if(client != Socket){
                client.send(e.toString())
            }
          })
        })

    Socket.on('close', () => {
        allSocket = allSocket.filter(x => x != Socket)
    })
})