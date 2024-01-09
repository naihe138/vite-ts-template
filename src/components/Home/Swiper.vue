<script lang="ts" setup>
import ChatSwiperItem from './SwiperItem.vue'
import type { IListItem } from '~/api/betaChat'
import { betaChatApi } from '~/api/betaChat'

interface ISwiperItem {
  index: number
  show: boolean
  x: number
  y: number
  opacity: number
  item: IListItem
}

const emit = defineEmits(['change'])

const listArr = ref<ISwiperItem[]>([])
// 记录x y轴
const x = reactive({
  start: 0,
  move: 0,
  end: 0,
})
const y = reactive({
  start: 0,
  move: 0,
  end: 0,
})
/* 下标 */
const currentIndex = ref(0)
/* 宽度宽度 */
const winWidth = ref(document.documentElement.clientWidth)
/* xy位移 */
const displacement = reactive({
  x: 0,
  y: 0,
})
/* 滑动 */
const swipering = ref(false)
/* 滑动中 */
const slideing = ref(false)

let cacheData: IListItem[] = []
const initLayout = (list: number[]) => {
  listArr.value.length = 0
  for (let index = 0; index < list.length; index++) {
    const swiperItem: ISwiperItem = {
      index,
      show: true,
      x: 0,
      y: 0,
      opacity: index < 3 ? 1 : 0,
      item: cacheData[list[index]],
    }
    listArr.value.push(swiperItem)
  }
}
// https://www.cnblogs.com/7c89/p/16651582.html
const init = async () => {
  const res = await betaChatApi.getList()
  if (res.code === 0) {
    cacheData = res.data || []

    const indexArray = cacheData.map((_item, index) => index)
    let newArray: number[] = []
    while (newArray.length < 100)
      newArray = newArray.concat(indexArray)

    initLayout(newArray)
    emit('change', cacheData[0].id)
  }
}

const initCSS = (index: number) => {
  const css: any = {}
  css['z-index'] = index
  css.transform = `translate3d(0,0,${(currentIndex.value - index)
        * 50}px)`
  css.transitionDuration = '0ms'

  return css
}

const Transform = (index: number) => {
  const css: any = {}
  if (!swipering.value)
    css.transitionDuration = '300ms'
  else
    css.transitionDuration = '0ms'

  if (index === currentIndex.value)
    css.transform = `translate3d(${listArr.value[index].x}px,${listArr.value[index].y}px,${(currentIndex.value - index) * 50}px)`

  css.opacity = listArr.value[index].opacity
  return css
}

const touchStart = (e: any) => {
  if (slideing.value)
    return
  swipering.value = true
  x.start = e.touches[0].pageX
  y.start = e.touches[0].pageY
}

// 滑动计算
const touchMove = (e: any, index: number) => {
  if (slideing.value)
    return
  if (listArr.value.length === index + 1)
    return

  x.move = e.touches[0].pageX
  y.move = e.touches[0].pageY
  // xxx
  displacement.x = listArr.value[index].x = x.move - x.start
  displacement.y = listArr.value[index].y = y.move - y.start
}

const touchEndNext = (index: number) => {
  slideing.value = true
  listArr.value[index].x = listArr.value[index].x * 3
  listArr.value[index].y = listArr.value[index].y * 3
  console.log('swiper index', index)
  emit('change', listArr.value[index + 1].item.id)
  setTimeout(() => {
    listArr.value[index].show = false
    nextTick(() => {
      currentIndex.value++
      if (index + 3 < listArr.value.length)
        listArr.value[index + 3].opacity = 1
      slideing.value = false
    })
  }, 300)
}

// 滑动结束判断是否超过一定值
const touchEnd = (index: number) => {
  swipering.value = false
  if (listArr.value.length === index + 1)
    return

  if (listArr.value[index].x > 0 && listArr.value[index].x > winWidth.value / 2 - winWidth.value / 4.5) {
    touchEndNext(index)
  }
  else if (listArr.value[index].x < 0 && listArr.value[index].x < -winWidth.value / 2 + winWidth.value / 4.5) {
    touchEndNext(index)
  }
  else {
    listArr.value[index].x = 0
    listArr.value[index].y = 0
    slideing.value = false
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="slide">
    <div
      v-for="(item, index) in listArr"
      v-show="item.show"
      :key="index"
      class="slide_item"
      :style="[initCSS(index), Transform(index)]"
      @touchstart.stop.prevent.capture="touchStart($event)"
      @touchmove.stop.prevent.capture="touchMove($event, index)"
      @touchend.stop.prevent.capture="touchEnd(index)"
    >
      <ChatSwiperItem :item="item.item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: relative;
  width: 314px;
  height: 500px;
  perspective: 1000px;
  perspective-origin: 50% 150%;
  transform-style: preserve-3d;
  margin: 1.5rem auto;
}
.slide .slide_item {
  transform-style: preserve-3d;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: absolute;
  z-index: 30;
  background: #fff;
  transform: translate3d(0px, 0px, 0px) rotate(0deg);
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.15);
  transition: 300ms;
  opacity: 0;
}
</style>
