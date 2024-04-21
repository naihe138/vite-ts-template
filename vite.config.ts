import { resolve } from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Legacy from '@vitejs/plugin-legacy'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import ViteCompression from 'vite-plugin-compression'
import dayjs from 'dayjs'
import { version } from './package.json'

const lastBuildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

const __META_INFO__ = {
  version,
  lastBuildTime,
}

// const base = process.env.NODE_ENV === 'production' ? '/dlife-h5/' : '/'

export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)
  const { VITE_BASE_LOCAL_URL } = env
  const plugins = [
    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    Legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),

    Inspect(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue-router',
        '@vueuse/head',
        'vue/macros',
        'pinia',
        {
          '@vueuse/core': [
            'useDark',
            'useToggle',
            'usePreferredDark',
            'useCounter',
          ],
          'vue': [
            'h',
            'shallowRef',
            'ref',
            'shallowReactive',
            'reactive',
            'computed',
            'watch',
            'watchEffect',
            'getCurrentInstance',
            'getCurrentScope',
            'provide',
            'inject',
            'nextTick',
            'onBeforeMount',
            'onBeforeUnmount',
            'onMounted',
            'onUnmounted',
            'onActivated',
            'onDeactivated',
            'readonly',
            'toRefs',
            'triggerRef',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [
        VantResolver(),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
  ]
  // app打包不需要zip压缩
  if (mode !== 'app') {
    plugins.push(ViteCompression({
      verbose: false,
    }))
  }
  return {
    base: mode === 'app' ? './' : VITE_BASE_LOCAL_URL,
    define: {
      __META_INFO__: JSON.stringify(__META_INFO__),
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://xxx.xxx.cn',
          // target: 'https://dlife.world',
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/api/, '')
            // return path.replace(/^\/api\/dev/, '')
          },
        },
      },
    },

    build: {
      // sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true, // 打包时删除 console
          drop_debugger: true, // 打包时删除 debugger
          pure_funcs: ['console.log'],
        },
        output: {
          comments: false, // 删掉注释
        },
      },
    },

    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
      },
    },

    plugins,

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
  }
})
