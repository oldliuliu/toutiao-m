<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem v-for="item in commentList" :key="item.com_id" :item="item" @replay-show="$emit('replay-show',$event)"></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      // 自定义校验函数
      validator (value) {
        // return ['a', 'c'].indexof(value) !==1
        return ['a', 'c'].includes(value)// 数据只能是a和c才能通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offest: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 数据已经全部加载完毕，则直接将 finished 设置成 true 即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 判断数据是否完全加载完毕
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)// 保留每一页数据
        // 本次返回结果的最后一个评论的id，作为下一页数据的offset的参数，若本次无具体数据，这值为null
        this.paramsObj.offest = res.data.data.last_id
        this.loading = false// 每次当前页面数据拿回来了，就把loading转圈效果关闭掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
