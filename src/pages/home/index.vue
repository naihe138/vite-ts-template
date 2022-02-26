<template>
  <h1 class="home">home</h1>
  <div class="btn" @click="toFetch">请求接口</div>
  <div class="info">{{ data }}</div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { ITag } from './types';
  import { useReport, useRequest } from '/@/hooks';

  const { clickReport } = useReport();
  const { loading, data, run } = useRequest<Recordable, ITag>(
    'https://blogapi.naice.me/api/tag/get',
    {},
    { immediate: false, method: 'GET' },
  );

  const toFetch = () => {
    run();
    clickReport('test-report');
  };

  watch(loading, (p, n) => {
    console.log(p, n, data.value);
  });
</script>

<style lang="scss" scoped>
  .btn {
    width: 550px;
    height: 98px;
    margin: 20px auto 0 auto;
    background-image: linear-gradient(180deg, #f87e74 0%, #fb405f 100%);
    border-radius: 100px;
    font-size: 42px;
    color: #ffffff;
    text-align: center;
    line-height: 98px;
    transform: scale(1);
  }
  .info {
    width: 700px;
    height: auto;
    overflow: hidden;
    word-break: break-all;
    border: 1px solid salmon;
    padding: 20px;
    margin: 10px auto;
    box-sizing: border-box;
  }
</style>
