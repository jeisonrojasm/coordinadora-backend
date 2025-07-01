import * as cityRepository from './city.repository'
import { getAllCitiesService } from './city.service'

describe('getAllCitiesService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe retornar una lista de ciudades exitosamente', async () => {
    const mockCities = [
      { city_id: 1, city_name: 'Bogotá' },
      { city_id: 2, city_name: 'Medellín' },
      { city_id: 3, city_name: 'Cali' }
    ]

    jest.spyOn(cityRepository, 'getAllCitiesRepository').mockResolvedValueOnce(mockCities)

    const result = await getAllCitiesService()

    expect(cityRepository.getAllCitiesRepository).toHaveBeenCalled()
    expect(result).toEqual({
      success: true,
      body: [
        { cityId: 1, cityName: 'Bogotá' },
        { cityId: 2, cityName: 'Medellín' },
        { cityId: 3, cityName: 'Cali' }
      ]
    })
  })

  it('debe retornar una lista vacía si no hay ciudades', async () => {
    jest.spyOn(cityRepository, 'getAllCitiesRepository').mockResolvedValueOnce([])

    const result = await getAllCitiesService()

    expect(cityRepository.getAllCitiesRepository).toHaveBeenCalled()
    expect(result).toEqual({
      success: true,
      body: []
    })
  })
})
