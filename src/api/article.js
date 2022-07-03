import request from '@/utils/request'
// 根据id查询文章
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
