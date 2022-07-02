<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 数据加载完了
        // 数据加载完毕需要把finished改为true
        // 新旧数据要合并在一起而不是把 旧数据覆盖
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 每次页码都+1请求下一页数据
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.container {
  overflow: hidden;
  height: calc(100vh-100px);
}
</style>
