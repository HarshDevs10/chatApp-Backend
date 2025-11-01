import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000})
let allSocket: WebSocket[] = []
let Usercount = 0

wss.on('connection', (Socket) => {
    Usercount++
    console.log("Connected #" + Usercount)
    allSocket.push(Socket)

    Socket.on('message', (e) => {
        setTimeout(() => {
            allSocket.forEach((client) => {
                client.send(e.toString() + "send from the server")
            })
        }, 1000)
    })

    Socket.on('close', () => {
        Usercount--
    })
})