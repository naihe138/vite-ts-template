<script lang="ts" setup>
import { useAutoFitImage } from './scaleImg'
import type { IListItem } from '~/api/betaChat'

const props = defineProps<{ item: IListItem }>()
const fitImage: any = useAutoFitImage(props.item.photos ? props.item.photos[0] || '' : '')
</script>

<template>
  <div class="w-full h-full relative overflow-hidden rounded-6">
    <div class="w-full h-full flex items-center justify-center">
      <img :src="item.photos && item.photos[0]" class="cImg" :style="fitImage" position="center" alt="">
    </div>
    <div
      absolute
      right-4
      top-4
      w-11
      h-11
      rounded-12
      flex
      items-center
      justify-center
      class="linkBox"
    >
      <van-icon name="like" size="1.5rem" color="#ffffff" />
    </div>
    <div class="info" absolute left-0 bottom-0 box-border pl-4 pb-4>
      <div text-white text-xl>
        {{ item.name }}
      </div>
      <div flex flex-wrap items-center my-2>
        <div v-for="(e, index) in item.labels" :key="index" class="tagItem">
          {{ e }}
        </div>
      </div>
      <div text-white>
        {{ item.remark }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tagItem {
  border-radius: 10px;
  background: rgba(24, 28, 48, 0.6);
  color: #ffffff;
  padding: 4px 10px;
  margin-right: 10px;
}
.linkBox {
  background: #FF5476;
  box-shadow: 0px 3px 6px  #FF5476;
}
.info {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 100%);
}
.cImg {
  max-width: 10000px;
}
</style>
