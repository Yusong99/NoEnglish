import api from './api'

export const uploadAvatar = async (uri) => {
  try {
    let formData = new FormData()
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    })
    formData.append('userId', userId)

    const res = await api.post(
      'http://192.168.124.4:8080/auth/user/avatar', // 注意不要用 localhost，换成电脑局域网 IP
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    console.log('upload result:', res.data)
  } catch (err) {
    console.log('上传失败:', err)
  }
}
