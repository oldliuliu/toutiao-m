<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <!-- to="/search"同级路由跳转 -->
        <van-button icon="search" type="info" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
      ><ChannellPonle
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannellPonle
    ></van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import ChannellPonle from './components/ChannellPonle.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.user.token) && this.channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log(res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  filters: {},
  components: {
    ArticleList,
    ChannellPonle
  }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  // unset把本来设置的样式干掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgb(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgb(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  position: fixed;
  width: 750px;
  z-index: 1;
  top: 92px;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-tabs__content {
  height: calc(100vh-274px);
  overflow: auto;
}
</style>
