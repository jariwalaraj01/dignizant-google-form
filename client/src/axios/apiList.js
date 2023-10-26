// eslint-disable-next-line 
import { POST, GET, PUT, DELETE, PATCH } from "./configure"

export const getFormAdmin = async () => {
  const response = await GET(`/admin/form`)
  return response
}

export const formAdmin = async (data) => {
  const { id, title, description, questionData } = data
  const response = await POST(`/admin/form`, { id, title, description, questionData })
  return response
}

export const getAllUserFormAPI = async () => {
  const response = await GET(`/admin/user-form`)
  return response
}


export const getUserFormAPI = async () => {
  const response = await GET(`/api/form`)
  return response
}

export const userFormAPI = async (data) => {
  const { name, questionData } = data
  const apiData = {
    name, questionData
  }
  const response = await POST(`/api/user-form`, apiData)
  return response
}