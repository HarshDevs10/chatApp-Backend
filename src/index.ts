import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000})
let allSocket: WebSocket[] = []

wss.on('connection', (Socket) => {

    Socket.on('message', (e) => {
        setTimeout(() => {
            allSocket.forEach((client) => {
                client.send(e.toString())
            })
        }, 500)
    })

    Socket.on('close', () => {
        allSocket = allSocket.filter(x => x != Socket)
    })
})