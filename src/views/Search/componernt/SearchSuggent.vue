<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item"
      icon="search"
      @click="$emit('search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 响应式数据写在data，非响应式写在export default上面，性能高一点
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggent',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v- html v- html是属性绑定，所以不能用过滤器
    // 所以只能在methods中写
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style='color:red'>${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 200)
      },
      immediate: true// 立即监听 组件在创建的时候就会监听一次
    }
  },
  // 组件被销毁了，要清理 掉定时器，避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
