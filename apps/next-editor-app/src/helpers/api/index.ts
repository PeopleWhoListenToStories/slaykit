import { AUTH_TOKEN_KEY, getStorage } from '~/helpers/storage'

export class API {
  public static uploadImage = async (file: File) => {
    const fileFormData = new FormData()
    fileFormData.append('file', file)

    return new Promise((resolve, reject) => {
      try {
        fetch('/api/file/upload?unique=1', {
          method: 'POST',
          body: fileFormData,
          headers: {
            Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.code === 200) {
              resolve(res.data.url)
            } else {
              reject(res)
            }
          })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default API
