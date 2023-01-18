/*
 * @Description:
 * @Autor: Dai YueLin
 * @Date: 2022-04-13 14:13:48
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-18 08:43:10
 */
/**
* 常量路由配置
* 格式：按标准路由数据格式配置
* */
import Ceshi from '@/components/Ceshi/index.vue'
import Dashboard from '@/views/Dashboard/index.vue'
import RoleList from "@/views/SystemManagement/RoleList/index.vue"
import UserManagement from "@/views/SystemManagement/UserManagement/index.vue"
export default [
  {
    path: "/",
    redirect: "/Dashboard",
    name: "/",
    children: [],
  },
  {
    path: "/Dashboard",
    name: "/Dashboard",
    component: () => import("@/components/layout/index.vue"),
    redirect: "/Dashboard/detail",
    children: [
      {
        path: "/Dashboard/detail",
        name: "/Dashboard/detail",
        component: Dashboard,
      }
    ],
  },
  {
    path: "/Ceshi",
    name: "/Ceshi",
    component: () => import("@/components/layout/index.vue"),
    redirect: "/Ceshi/detail",
    children: [
      {
        path: "/Ceshi/detail",
        name: "/Ceshi/detail",
        component: Ceshi,
      }
    ],
  },
  {
    path: "/ContentManagement",
    name: "Content Management",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/ContentManagement/News",
        name: "News",
        component: () => import("@/views/ContentManagement/News.vue"),
      },
      {
        path: "/ContentManagement/NewsLetter",
        name: "Newsletter",
        component: () =>
            import("@/views/ContentManagement/NewsLetter.vue"),
      },
      {
        path: "/ContentManagement/TrainingLibrary",
        name: "TrainingLibrary",
        component: () =>
            import("@/views/ContentManagement/TrainingLibrary.vue"),
      },
      // {
      //   path: "/ContentManagement/ProductCenter/DBO",
      //   name: "DBO",
      //   component: () =>
      //       import("@/views/ContentManagement/dbo.vue"),
      // },
      // {
      //   path: "/ContentManagement/ProductCenter/DTOOpenCurse",
      //   name: "DTO Open Curse",
      //   component: () =>
      //       import("@/views/ContentManagement/DTOOpenCurse.vue"),
      // },
    ],
  },
  {
    path: "/SystemManagement",
    name: "System Management",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/SystemManagement/RoleList",
        name: "Role List",
        component: RoleList,
      },
      {
        path: "/SystemManagement/UserManagement",
        name: "User Management",
        component: UserManagement,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/404/index.vue"),
  },
]


