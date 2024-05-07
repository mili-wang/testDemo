import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VantResolver } from "@vant/auto-import-resolver"
import Components from "unplugin-vue-components/vite"
import { resolve } from 'path'

//function resolve(dir){
//  return join(__dirname,dir)
//}
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(),
    Components({
      resolves: [VantResolver()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`,
        },
      ],
    }),
  ],
  resolve:{
      alias:{
        '@':  resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.vue','.json'],
  },
})