<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <!-- 手机号 -->
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '格式不符合' },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '格式不符合' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="time" format="ss s" />
          <van-button
            @click="onSenSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            @finish="isCountDownShow = false"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 提交 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13711111111', // 手机号
      code: '246810', // 短信验证码
      time: 60 * 1000, // 倒计时
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        // console.log(res)
        // token 有效期两小时有两种 一种是让用户从新登录 一种是直接重新计算
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ path: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSenSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true// 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('失败')
        }
      } catch (err) {
        console.log(err)
        console.log('失败')
        this.$toast.fail('手机号格式不对')
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
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 24px;
  font-size: 22px;
  color: #666;
  position: fixed;
  right: 10px;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
