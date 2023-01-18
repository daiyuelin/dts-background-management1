/*
 * @Description: 
 * @Autor: Dai YueLin
 * @Date: 2022-08-31 16:49:10
 * @LastEditors: Dai YueLin
 * @LastEditTime: 2023-01-05 12:29:29
 */
import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathResolve = (dir) => {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
      // ...
       AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": pathResolve("/src"),
        '~/': `${resolve(__dirname, 'src')}/`,
      }
    },
    server: {
      open: true,
    }
  }
})




