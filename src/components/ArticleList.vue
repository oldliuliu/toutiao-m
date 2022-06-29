<template>
  <van-cell-group inset>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-cell
        v-for="(item, index) in ArticleList"
        :key="index"
        :title="item.title"
        value="内容"
        :label="item.pubdate"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      timestamp: Date.now(),
      ArticleList: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.isLoading) {
        this.ArticleList = []
        this.isLoading = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        // 获取下一页的时间戳
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已全部加载完毕，则直接将 finished 设置成 true
        if (this.timestamp === null) {
          this.finished = true
        }
        // 获取下一页的数据
        this.ArticleList.push(...res.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('触发了')
      this.finished = false// 防止用户把加载更多告结束了
      this.loading = true// 重新加载数据
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
