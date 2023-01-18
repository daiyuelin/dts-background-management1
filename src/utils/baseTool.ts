/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-14 09:16:42
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:49:12
 */
/*
* 判断字符串是否是Json数据格式
* */
export function isJson (str:any) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
/*
* 判断链接地址是不是外链
* */
export function isExternal (path:any) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/*
* 获取url参数
* */
export function getUrlParam (name:any, str = window.location.search) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = str.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
