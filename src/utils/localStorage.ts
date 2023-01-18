/*
 * @Description: 缓存机制
 * @Autor: Dai YueLin
 * @Date: 2022-04-14 09:16:42
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:47:17
 */
import { isJson } from '@/utils/baseTool'

if (!window.localStorage) {
  alert('浏览器不支持本系统数据存储')
}

let storage = window.localStorage

export function storeSet (key:any, value:any) {
  value = typeof value === 'string' ? value : JSON.stringify(value)
  storage.setItem(key, value)
}

export function storeGet(key: any) {
  let result = storage.getItem(key)
  if (result !== null && isJson(result)) {
    return JSON.parse(result || '')
  } else {
    return result
  }
}

export function storeRemove (key:any) {
  storage.removeItem(key)
}

export function storeClear () {
  storage.clear()
}
