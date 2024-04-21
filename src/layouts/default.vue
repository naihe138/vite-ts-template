<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component" :key="$route.name" />
    </keep-alive>
    <component :is="Component" v-else :key="$route.name" />
  </router-view>
</template>
