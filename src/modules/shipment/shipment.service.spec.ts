import { CreateShipmentDto } from './shipment.validation'
import * as shipmentRepository from './shipment.repository'
import { createShipmentService } from './shipment.service'
import redis from '../../config/redis'

jest.mock('./shipment.repository')

afterAll(async () => {
  await redis.quit()
})

describe('createShipmentService', () => {
  const userId = 'f3bde31e-4579-41c6-84b5-c69c58b9d1b4'

  const shipmentData: CreateShipmentDto = {
    origin: 1,
    destination: 2,
    weight: 10,
    height: 20,
    width: 30,
    length: 40,
    price: 20000
  }

  const fakeShipmentResponse = {
    shipment_id: 'fabc1234-5678-90ab-cdef-1234567890ab',
    user_id: userId,
    ...shipmentData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe crear un nuevo envío y registrar el estado inicial como "En espera"', async () => {
    // Mock de createShipmentRepository
    jest
      .spyOn(shipmentRepository, 'createShipmentRepository')
      .mockResolvedValueOnce(fakeShipmentResponse)

    // Mock de addShipmentStatusHistory
    const statusHistorySpy = jest
      .spyOn(shipmentRepository, 'addShipmentStatusHistory')
      .mockResolvedValueOnce(undefined)

    const result = await createShipmentService(userId, shipmentData)

    expect(shipmentRepository.createShipmentRepository).toHaveBeenCalledWith(userId, shipmentData)
    expect(statusHistorySpy).toHaveBeenCalledWith(fakeShipmentResponse.shipment_id, 1)
    expect(result.success).toBe(true)
    expect(result.body).toEqual(fakeShipmentResponse)
  })
})
