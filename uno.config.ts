import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-6 py-2 rounded text-base font-semibold transition duration-300 inline-block cursor-pointer hover:scale-105 active:duration-75 active:scale-95 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['btn-primary', 'btn bg-primary text-white'],
    ['btn-warning', 'btn bg-yellow text-white'],
    ['btn-red', 'btn bg-red text-white'],
    ['icon-btn', 'text-[0.9em] text-$c-color inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none'],
    ['gray-title', 'text-slate-800/60 dark:text-white/60'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--chatFlex', '--chatPlayer', '--chatList', '--roleDetail', '--detailPlayer', '--detailList'],
    }),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: '#34d399',
      secondary: '#7CC0C6',
      info: '#1989fa',
    },
  },
})
