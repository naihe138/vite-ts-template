module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 32,
      propList: ['*'],
      exclude: /node_modules/i,
    },
  },
}
