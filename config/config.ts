import { defineConfig } from '@umijs/max';
// import { routes } from './routes';
export default defineConfig({
  // 默认路由模式是“browser”，打包后会出现首页或其他页面找不到继而加载不出来的情况，所以需要改成hash模式。
  hash: true,
  history: {
    // 配置 history 类型和配置项
    type: 'hash', // 可选 browser、hash 和 memory
  },
  // 生产环境下需走相对路径
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './', // 配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值
  // 指定webpack包输出路径 防止与electron包路径重叠  再将build包 打包进electron
  outputPath: './dist/render',

  /* ----------------------------------------------------------------------------*/
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  // routes,
  externals: {
    serialport: 'commonjs2 serialport', // Ref: https://copyprogramming.com/howto/electron-and-serial-ports
  },
  npmClient: 'pnpm',
});
