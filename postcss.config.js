/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-12-29 09:20:22
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-04 17:51:50
 */
module.exports = {
    'plugins': {
      'postcss-pxtorem': {
        rootValue: 192, // 设计稿宽度除以 10，  开头大写的Px 不转换 => height: 100Px, 内联样式不转换，需要 / 75 转成 rem
        unitPrecision: 3, // 计算结果保留 6 位小数
        selectorBlackList: ['.no-rem', 'no-rem'], // 要忽略的选择器并保留为px。
        propList: ['*'], // 可以从px更改为rem的属性  感叹号开头的不转换
        replace: true, // 转换成 rem 以后，不保留原来的 px 单位属性
        mediaQuery: true, // 允许在媒体查询中转换px。
        minPixelValue: 2, // 设置要替换的最小像素值。
        exclude: /node_modules/i,
      }
    }
  }