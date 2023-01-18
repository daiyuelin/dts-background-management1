/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-14 09:16:42
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:34:05
 */
import { storeSet, storeGet, storeRemove } from '@/utils/localStorage'

/*
* token相关操作
* */

const TokenKey = 'Admin-Token'

export function getToken () {
  return storeGet(TokenKey)
}

export function setToken (token:any) {
  return storeSet(TokenKey, token)
}

export function removeToken () {
  return storeRemove(TokenKey)
}
