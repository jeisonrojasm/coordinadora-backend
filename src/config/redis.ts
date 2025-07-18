import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
})

redis.on('connect', () => {
  console.log('✅ Redis conectado')
})

redis.on('error', (err) => {
  console.error('❌ Redis error:', err)
})

export default redis
