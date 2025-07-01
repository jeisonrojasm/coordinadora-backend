import http from 'http'
import app from './app'
import { initSocketServer } from './config/socket'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

initSocketServer(server)

server.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`)
})
