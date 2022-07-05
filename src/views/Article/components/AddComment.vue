<template>
  <div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="add-field"
      ref="field"
    >
      <template #extra>
        <!-- 当输入框没有内容的时候，按钮应该是被禁用的 -->
        <van-button
          type="default"
          class="btn"
          :disabled="message.length === 0"
          @click="onClick"
          >发布</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // dom准备好 可以找到textarea
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  botton {
    border: none;
  }
}
</style>
