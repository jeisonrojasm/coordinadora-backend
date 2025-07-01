import { getAllStatusRepository } from './status.repository'

export const getAllStatusService = async () => {
  const status = await getAllStatusRepository()

  return {
    success: true,
    body: status.map(status => ({
      statusId: status.status_id,
      statusName: status.status_name
    }))
  }
}