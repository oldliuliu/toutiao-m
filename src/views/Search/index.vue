<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
      <!-- 当搜索值为空的时候显示搜索历史 -->
      <!-- 当搜索中有值的时候，显示搜索建议，当回车的时候显示搜索结果 -->
      <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
      <template v-else>
        <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
        <SearchSuggent
          v-else
          :searchText="searchText"
          @search="onSearch"
        ></SearchSuggent>
      </template>
    </form>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/componernt/SearchHistory.vue'
import SearchResult from '@/views/Search/componernt/SearchResult.vue'
import SearchSuggent from '@/views/Search/componernt/SearchSuggent.vue'
export default {
  created () { },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('searchHisstoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggent
  }
}
</script>

<style scoped lang='less'>
</style>
