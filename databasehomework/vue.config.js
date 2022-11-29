const { defineConfig } = require("@vue/cli-service");
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      "/api": {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: "http://127.0.0.1:8888/",
        // 允许跨域
        changeOrigin: true,
        ws: true,
        secure: true, //是否https接口
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 引入公共文件
        path.resolve(__dirname, "./src/assets/less/common.less")
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true,
        },
      },
    },}
});
