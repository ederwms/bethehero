import axios from 'axios'

export const custAxios = () => {
  const instance = axios.create({
    headers: {
      Authorization: localStorage.getItem('ong-id')
    }
  })

  return instance
}
