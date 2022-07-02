/* eslint-disable camelcase */
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
// 获取搜索结果列表
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
