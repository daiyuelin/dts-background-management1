/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-04-25 12:26:22
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:37:31
 */
const http = {
  namespaced: true,
  state: {
    requests: []
  },
  mutations: {
    SET_REQUESTS: (state:any, request:any) => {
      state.requests.push(request)
    },
    CLEAR_REQUESTS: (state:any) => {
      state.requests.forEach((cancel: () => any) => {
        cancel && cancel()
      })
      state.requests = []
    }
  },
  actions: {
    saveRequestQueue ({ commit }:any, request:any) {
      return new Promise<void>((resolve) => {
        commit('SET_REQUESTS', request)
        resolve()
      })
    },
    clearRequests ({ commit }:any) {
      commit('CLEAR_REQUESTS')
    }
  }
}

export default http
