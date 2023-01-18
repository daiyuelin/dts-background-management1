/*
 * @Description: vuex
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 17:45:19
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:38:40
 */
import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules = Object.keys(modulesFiles).reduce((modules:any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value:any = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore({
  modules,
  getters
})

export default store
