import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

let io: SocketIOServer

export const initSocketServer = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: { origin: '*' }
  })

  io.on('connection', socket => {
    console.log(`🟢 Cliente conectado: ${socket.id}`)

    socket.on('joinRoom', (userId: string) => {
      socket.join(`user:${userId}`)
      console.log(`Usuario ${userId} unido a sala`)
    })

    socket.on('disconnect', () => {
      console.log(`🔌 Cliente desconectado: ${socket.id}`)
    })
  })

  return io
}

export const getIO = () => {
  if (!io) throw new Error('Socket.IO no inicializado')
  return io
}
