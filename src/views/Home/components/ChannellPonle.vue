<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="mini"
          plain
          type="danger"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'pink' : '' }"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index != 0"
              :style="{ color: active === index ? 'pink' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id"
          ><div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
// 用户没有登录做本地存储
// 用户登录过，做ajax持久化
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const res = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[res])
      this.recommendChannels.splice(res, 1)
    },
    onClick (index) {
      if (index === 0) return
      if (this.isCloseShow) {
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) { // 登陆过
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 先把频道数据处理一下
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true// 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
  .van-button {
    width: 113px;
    height: 42px;
    border-radius: 20px;
  }
  .inner {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    line-height: 86px;
    text-align: center;
    letter-spacing: 1px;
    color: #222222;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
  .van-col {
    margin-bottom: 20px;
  }
}
</style>
