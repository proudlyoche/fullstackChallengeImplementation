import { UserCreateParamType } from "./../core/type"
import axios, { AxiosResponse } from "axios"
import { ApiUrl } from "./api"

// default

axios.defaults.baseURL = ApiUrl

// content type

axios.defaults.headers.post["Content-Type"] = "application/json"

/**
 * Fetches data from given url
 */

export const get = async (url: string): Promise<AxiosResponse> => {
  const data = await axios.get(url)
  return data
}

/**a
 * post given data to url
 */

export const create = async (
  url: string,
  data: UserCreateParamType
): Promise<AxiosResponse> => {
  return axios.post(url, data)
}

/**
 * Updates data
 */

export const update = async (
  url: string,
  data: unknown
): Promise<AxiosResponse> => {
  return axios.put(url, data)
}

/**
 * Delete
 */

export const deleteUser = async (url: string): Promise<AxiosResponse> => {
  return axios.delete(url)
}
