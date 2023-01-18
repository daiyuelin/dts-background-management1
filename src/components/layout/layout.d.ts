/*
 * @Description: 
 * @Author: YushengSenior
 * @Date: 2021-11-01 16:08:20
 * @LastEditTime: 2021-11-16 10:07:09
 * @LastEditors: YushengSenior
 */
import { RouteRecordRaw } from 'vue-router'
interface childrenSeeting {
    hiddenInMenu?: boolean,
}

interface IRouteChildren {
    hiddenInMenu?: boolean,
    children?: Array<childrenSeeting & RouteRecordRaw>
}

export type LocalRoute = Array<IRouteChildren & RouteRecordRaw>