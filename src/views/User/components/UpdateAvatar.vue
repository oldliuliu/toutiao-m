<template>
  <div>
    <img :src="imgSrc" ref="img" />
    <van-button @click="onConfirm">确定</van-button>
  </div>
</template>

<script>
import { updateAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
let cropper = null
export default {
  created () { },
  data () {
    return {}
  },
  mounted () {
    const image = this.$refs.img
    cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      crop (event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    })
    console.log(cropper)
  },
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    onConfirm () {
      // 发起ajax
      cropper.getCroppedCanvas().toBlob(async file => {
        const fd = new FormData()
        fd.append('photo', file)
        try {
          const res = await updateAvatar(fd)
          this.$emit('update:imgSrc', res.data.data.photo)
          this.$emit('close')
          console.log(res)
        } catch (err) {
          console.log(err)
        }
        console.log(file)
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
