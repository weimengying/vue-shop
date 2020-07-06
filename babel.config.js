//這是項目发布阶段需要用的的babel插件
const prodPlugins = []

if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    //发布产品时候的插件数组
    ...prodPlugins, //展开运算符（把数组prodPlugins里的每一项放在plugins）
    '@babel/plugin-syntax-dynamic-import'

  ]

}
