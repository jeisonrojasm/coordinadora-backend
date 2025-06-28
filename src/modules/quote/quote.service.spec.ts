import { calculateQuoteService } from './quote.service'
import * as quoteRepository from './quote.repository'
import { ApiException } from '../../utils/exceptions/ApiException'
import redis from '../../config/redis'

jest.mock('./quote.repository')

afterAll(async () => {
  await redis.quit()
})

describe('calculateQuoteService', () => {
  const baseData = {
    origin: 1,
    destination: 2,
    weight: 8,
    height: 40,
    width: 30,
    length: 40
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe lanzar ApiException si no se encuentra tarifa', async () => {
    jest.spyOn(quoteRepository, 'findOneByRouteAndWeight').mockResolvedValueOnce(null)

    await expect(calculateQuoteService(baseData)).rejects.toThrow(ApiException)
    try {
      await calculateQuoteService(baseData)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiException)
      expect(error.message).toBe('RATE_NOT_FOUND')
      expect(error.statusCode).toBe(404)
    }
  })

  it('debe calcular correctamente el peso volumétrico y usarlo si es mayor al peso real', async () => {
    const volumetricWeight = Math.ceil((baseData.height * baseData.width * baseData.length) / 2500) // 19.2 → 20
    const expectedFinalWeight = Math.max(baseData.weight, volumetricWeight)

    jest.spyOn(quoteRepository, 'findOneByRouteAndWeight').mockResolvedValueOnce({ price: 25000 })

    const result = await calculateQuoteService(baseData)

    expect(quoteRepository.findOneByRouteAndWeight).toHaveBeenCalledWith(
      baseData.origin,
      baseData.destination,
      expectedFinalWeight
    )

    expect(result.success).toBe(true)
    expect(result.body).toEqual({
      origin: baseData.origin,
      destination: baseData.destination,
      finalWeight: expectedFinalWeight,
      price: 25000
    })
  })

  it('debe usar el peso real si es mayor que el peso volumétrico', async () => {
    const customData = {
      ...baseData,
      weight: 25, // mayor al peso volumétrico
      height: 10,
      width: 10,
      length: 10
    }

    const volumetricWeight = Math.ceil((10 * 10 * 10) / 2500) // 4
    const expectedFinalWeight = 25

    jest.spyOn(quoteRepository, 'findOneByRouteAndWeight').mockResolvedValueOnce({ price: 30000 })

    const result = await calculateQuoteService(customData)

    expect(quoteRepository.findOneByRouteAndWeight).toHaveBeenCalledWith(
      customData.origin,
      customData.destination,
      expectedFinalWeight
    )

    expect(result.body.finalWeight).toBe(expectedFinalWeight)
    expect(result.body.price).toBe(30000)
  })
})