<template>
  <div>
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('delAllHistory')">全部删除</span
        >&nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isDelete = true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHisstoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        v-if="isDelete"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () { },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {},
  computed: {
    ...mapState(['searchHisstoryList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
