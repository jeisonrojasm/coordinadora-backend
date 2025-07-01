import { getAllCitiesRepository } from './city.repository'

export const getAllCitiesService = async () => {
  const cities = await getAllCitiesRepository()

  return {
    success: true,
    body: cities.map((city: { city_id: any; city_name: any }) => ({
      cityId: city.city_id,
      cityName: city.city_name
    }))
  }
}
