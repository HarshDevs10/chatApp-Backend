import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000})

interface User {
    socket: WebSocket
    room: string
}
let allSocket: User[] = []

wss.on('connection', (Socket) => {

    Socket.on('message', (message) => {
        const ParsedMessage = JSON.parse(message.toString())

        if(ParsedMessage.type === "join"){
            allSocket.push({
                socket: Socket,
                room: ParsedMessage.payload.roomId
            })
            Socket.send("Joined the Room " + ParsedMessage.payload.roomId)
        }
        else if(ParsedMessage.type === "chat"){

            const ele = allSocket.find(x => x.socket === Socket)
            if (!ele) return Socket.send("Join a Room first.")
            const roomId = ele.room

            allSocket.forEach((e) => {
                if(e.room === roomId && e.socket != Socket){
                    e.socket.send(ParsedMessage.payload.message)
                }
            })
            
        }
        })

    Socket.on('close', () => {
        allSocket = allSocket.filter(x => x.socket != Socket)
    })
})