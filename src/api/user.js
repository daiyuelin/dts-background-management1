/*
 * @Description: 接口定义
 * @Autor: Dai YueLin
 * @Date: 2022-04-14 09:25:52
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2022-12-27 16:27:54
 */
import Http from '@/utils/http'

const webConfig = window.webConfig

// 登录接口
export function login(data) {
  return Http.get(webConfig.apiUrl + '/api/v1/login/getFakeToken',data)
}
// 用户列表
export function getUsers(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/buser/getData',data)
}
// 角色列表
export function getRoles(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/role/getData',data)
}
// 用户新增
export function addUser(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/buser/addUser',data)
}
// 角色新增
export function addRole(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/role/addRole',data)
}
// 用户修改
export function updateUser(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/buser/updateUser',data)
}
// 角色修改
export function updateRole(data) {
  return Http.post(webConfig.apiUrl + '/backend/admin/role/updateRole',data)
}
// 获取所有权限
export function getAllPermission() {
  return Http.post(webConfig.apiUrl + '/backend/admin/role/getAllPermission')
}
