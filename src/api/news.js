/*
 * @Author: Panda-Awu leoyuan618@qq.com
 * @Date: 2022-12-06 14:01:13
 * @LastEditTime: 2022-12-09 14:49:01
 * @LastEditors: Panda-Awu leoyuan618@qq.com
 * @Description:
 * @FilePath: /DTS-Online-Backend-2022-12-01/src/service/Dashboard/index.ts
 * Copyright (c) 2022 by Panda-Awu leoyuan618@qq.com , All Rights Reserved.
 */
import Http from '@/utils/http'
import axios from "axios";

// 上傳
export function upload(data) {
    return Http.get(webConfig.apiUrl + '/backend/dashboard/upload?fileName='+data)
}
// training列表
export function getTrainingLibrary(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/trainingLirary/getData',data)
}
// 新增
export function addTL(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/trainingLirary/addTL',data)
}
// 修改
export function updateTL(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/trainingLirary/updateTL',data)
}

// news/newsletter列表
export function getNews(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/news/getData',data)
}
// 新增
export function addNews(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/news/addNews',data)
}
// 修改
export function updateNews(data) {
    return Http.post(webConfig.apiUrl + '/backend/admin/news/updateNews',data)
}

