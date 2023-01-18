/*
 * @Description:
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 17:45:19
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 14:45:18
 */
import { getToken } from '../../utils/system'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state:any, token:any) => {
    state.token = token
  },
  SET_INTRODUCTION: (state:any, introduction:any) => {
    state.introduction = introduction
  },
  SET_NAME: (state:any, name:any) => {
    state.name = name
  },
  SET_AVATAR: (state:any, avatar:any) => {
    state.avatar = avatar
  },
  SET_ROLES: (state:any, roles:any) => {

    state.roles = roles
  }
}

const actions = {
  loginByToken({ commit }:any, token:any) {
    commit('SET_TOKEN', token)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
