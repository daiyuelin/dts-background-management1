/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2021-07-13 14:43:28
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-09 11:32:04
 */
const webConfig = {
  // 接口地址
  apiUrl: 'http://ec2-52-80-186-64.cn-north-1.compute.amazonaws.com.cn:8081',
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = webConfig
} else {
  window.webConfig = webConfig
}

