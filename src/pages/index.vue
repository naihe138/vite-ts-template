<script lang="ts" setup>
defineOptions({
  name: 'Home',
})

const router = useRouter()
const toChat = () => {
  router.push('/about')
}

// document.body.addEventListener('touchmove', (e) => {
//   e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
// }, { passive: false }) // passive 参数不能省略，用来兼容ios和android
</script>

<template>
  <div overflow-hidden w-screen h-screen>
    <h1>Home</h1>
    <van-button type="primary" @click="toChat">
      关于
    </van-button>
    <van-button type="primary">
      主要按钮
    </van-button>
    <van-button type="success">
      成功按钮
    </van-button>
    <van-button type="default">
      默认按钮
    </van-button>
    <van-button type="warning">
      警告按钮
    </van-button>
    <van-button type="danger">
      危险按钮
    </van-button>
  </div>
</template>

<style scoped lang="scss">

</style>
