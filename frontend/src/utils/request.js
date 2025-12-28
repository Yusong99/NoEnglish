import urlcat from 'urlcat'
export const request = async (url, { method = 'GET', params, body } = {}) => {
  //完整的接口地址
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const requestUrl = urlcat(apiUrl, url, params)
  //请求头
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  }

  const response = await fetch(requestUrl, config)

  if (!response.ok) {
    const { message, errors } = await response.json().catch(() => null)
    const error = new Error(message)
    error.status = response.status
    error.errors = errors
    throw error
  }

  return await response.json()
}
