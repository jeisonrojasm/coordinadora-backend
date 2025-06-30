import { getAllCitiesRepository } from './city.repository'

export const getAllCitiesService = async () => {
  const cities = await getAllCitiesRepository()

  return {
    success: true,
    body: cities.map(city => ({
      cityId: city.city_id,
      cityName: city.city_name
    }))
  }
}
