import request from '@/utils/request'
// 只有在vue组件文件中才有this.store，在js中没有this 所以只能

// 验证码
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 * 登录
*/
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户个人资料
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}
// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: 'user/profile'
  })
}

/**
 *
 * @param {对象 用户个人资料} profile
 * @returns 更新用户个人资料
 */
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
 *更新头像
 * @param {裁剪之后的数据对象} data
 * @returns
 */
export const updateAvatar = data => {
  return request({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}
// 这几个数据是平级的
// export const 接口名 = () => {
//   return request({
//     url,
//     method,
//     headers,
//     data,
//     params
//   })
// }
