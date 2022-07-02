import request from '@/utils/request'

// 搜索联想数据列表
export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
