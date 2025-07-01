import { CreateShipmentDto } from './shipment.validation'
import * as shipmentRepository from './shipment.repository'
import { createShipmentService, getUserShipmentsService } from './shipment.service'
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

describe('getUserShipmentsService', () => {
  const userId = 'ff666369-ee16-4332-a454-5e108dff0bea'

  const fakeShipments = [
    {
      shipment_id: 'ff666369-ee16-4332-a454-5e108dff0bea',
      user_id: userId,
      weight: '150',
      height: '152',
      width: '154',
      length: '165',
      price: '79000',
      created_at: '2025-07-01T03:00:58.349Z',
      updated_at: '2025-07-01T03:00:58.349Z',
      origin_name: 'Bogotá',
      destination_name: 'Medellín',
      status_id: 1,
      status_name: 'En espera',
      changed_at: '2025-07-01T03:00:58.356Z'
    }
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe retornar los envíos del usuario', async () => {
    jest
      .spyOn(shipmentRepository, 'getShipmentsByUserRepository')
      .mockResolvedValueOnce(fakeShipments)

    const result = await getUserShipmentsService(userId)

    expect(shipmentRepository.getShipmentsByUserRepository).toHaveBeenCalledWith(userId)
    expect(result).toEqual(fakeShipments)
  })

  it('debe retornar un array vacío si el usuario no tiene envíos', async () => {
    jest
      .spyOn(shipmentRepository, 'getShipmentsByUserRepository')
      .mockResolvedValueOnce([])

    const result = await getUserShipmentsService(userId)

    expect(shipmentRepository.getShipmentsByUserRepository).toHaveBeenCalledWith(userId)
    expect(result).toEqual([])
  })
})
