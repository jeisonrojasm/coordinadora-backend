import { getAllStatusService } from './status.service'
import * as statusRepository from './status.repository'

describe('getAllStatusService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe retornar una lista de estados exitosamente', async () => {
    const mockStatus = [
      { status_id: 1, status_name: 'En espera' },
      { status_id: 2, status_name: 'En tránsito' },
      { status_id: 3, status_name: 'Entregado' }
    ]

    jest
      .spyOn(statusRepository, 'getAllStatusRepository')
      .mockResolvedValueOnce(mockStatus)

    const result = await getAllStatusService()

    expect(statusRepository.getAllStatusRepository).toHaveBeenCalled()
    expect(result).toEqual({
      success: true,
      body: [
        { statusId: 1, statusName: 'En espera' },
        { statusId: 2, statusName: 'En tránsito' },
        { statusId: 3, statusName: 'Entregado' }
      ]
    })
  })

  it('debe retornar una lista vacía si no hay estados', async () => {
    jest
      .spyOn(statusRepository, 'getAllStatusRepository')
      .mockResolvedValueOnce([])

    const result = await getAllStatusService()

    expect(statusRepository.getAllStatusRepository).toHaveBeenCalled()
    expect(result).toEqual({
      success: true,
      body: []
    })
  })
})