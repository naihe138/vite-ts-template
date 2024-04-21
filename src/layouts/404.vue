<template>
  <main p="x-$gap y20" text="center teal-700 dark:gray-200">
    <div text-4xl mb-10>
      <div i-carbon-warning inline-block />
    </div>

    <RouterView />

    <div mt-10>
      <van-button to="/" type="primary" block>
        Back Home
      </van-button>
    </div>
  </main>
</template>
