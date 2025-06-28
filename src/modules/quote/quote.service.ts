import redis from '../../config/redis'
import { ApiException } from '../../utils/exceptions/ApiException'
import { findOneByRouteAndWeight } from './quote.repository'
import { QuoteDto } from './quote.validation'

export const calculateQuoteService = async (data: QuoteDto) => {
  const { origin, destination, weight, height, width, length } = data

  const redisKey = `quote:${origin}:${destination}:${weight}:${height}:${width}:${length}`
  const cached = await redis.get(redisKey)
  if (cached) {
    return {
      success: true,
      body: JSON.parse(cached)
    }
  }

  const volumetricWeight = Math.ceil((height * width * length) / 2500)
  const finalWeight = Math.max(weight, volumetricWeight)

  const rate = await findOneByRouteAndWeight(origin, destination, finalWeight)
  if (!rate) throw new ApiException('RATE_NOT_FOUND', 404)

  const quoteResult = {
    origin,
    destination,
    finalWeight,
    price: rate.price
  }

  await redis.setex(redisKey, 300, JSON.stringify(quoteResult)) // Cache por 5 min

  return {
    success: true,
    body: quoteResult
  }
}
