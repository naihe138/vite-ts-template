<script setup lang="ts">
import { useAutoRefreshToken } from './composables/token'
import { AppDescription, AppName } from '~/constants'
import { isDark } from '~/composables/dark'
import { themeVars } from '~/constants/theme'

const isRefreshingToken = useAutoRefreshToken()
useHead({
  title: AppName,
  meta: [
    { name: 'description', content: AppDescription },
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#121212' : '#f8f8fb')),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: `${import.meta.env.VITE_BASE_LOCAL_URL}favicon.png`,
    },
  ],
})
</script>

<template>
  <van-config-provider
    :theme-vars="themeVars"
    class="h-full w-full"
    :theme="isDark ? 'dark' : 'light'"
  >
    <div class="van-safe-area-top" />
    <Loading v-if="isRefreshingToken" />
    <router-view v-else v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" :key="$route.name" />
      </keep-alive>
      <component :is="Component" v-else :key="$route.name" />
    </router-view>
    <div class="van-safe-area-bottom" />
  </van-config-provider>
</template>
