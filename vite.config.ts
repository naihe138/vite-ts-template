import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import html from 'vite-plugin-html';
import { VantResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
// npm i --save-dev @types/node
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  // const isBuild = command === 'build';
  const { VITE_PORT } = env;
  return {
    // base: getBasePath(env),
    root,
    resolve: {
      // 路径别名
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // 支持使用tsx语法
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: 'import { h } from "vue";',
    },
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [VantResolve()],
      }),
      html({
        // inject: {
        //   data: {
        //     injectReportScript: `<script src="${env.VITE_REPORT_CDN}"></script>`,
        //   },
        // },
        // minify: true,
      }),
    ],
    build: {
      target: 'es2015',
    },
    server: {
      host: true,
      port: Number(VITE_PORT),
      proxy: {
        // 字符串简写写法
        // '^/fallback/.*': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/fallback/, '')
        // },
      },
    },
  };
});
