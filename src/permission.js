/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2021-07-06 15:21:50
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-12-29 17:53:28
 */
import router from './router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/system'
import store from '@/store/'
import { setToken } from '@/utils/system'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/hello'] // no redirect whitelist

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = 'big-data'
  let urlToken = GetQueryString('token')
  if (urlToken !== '' && urlToken !== null) {
    setToken(urlToken)
    store.dispatch('user/loginByToken', urlToken)
  } else {
    urlToken = false
  }
  if (store.getters.token || urlToken) {
    next()
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
